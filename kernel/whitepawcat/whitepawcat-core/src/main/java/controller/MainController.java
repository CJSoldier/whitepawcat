package controller;


import com.alibaba.fastjson.JSONObject;
import org.apache.log4j.Logger;

import java.io.File;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.*;
import java.util.jar.JarFile;

public class MainController {
    private static Map classLoaderContainer = new HashMap();
    private static Logger logger = Logger.getLogger(MainController.class);

    public static String main(String arg) {
        try {
            System.out.println(arg);
            Map argMap = JSONObject.parseObject(arg, Map.class);
            String jarName = (String) argMap.get("jarName");
            ClassLoader loader = null;
            if (classLoaderContainer.containsKey(jarName)) {
                loader = (ClassLoader) classLoaderContainer.get(jarName);
            } else {
                String jarFolder = new File(MainController.class.getProtectionDomain().getCodeSource().getLocation().toURI()).getParent();
                String jarPath = jarFolder + "/" + jarName;
                JarFile jarFile = new JarFile(new File(jarPath));
                URL url = new URL("file:" + jarPath);
                List<URL> pathList = new ArrayList<>();
                pathList.add(url);
                loader = new ParentLastURLClassLoader(pathList);
                classLoaderContainer.put(jarName, loader);
            }
            String clsName = (String) argMap.get("classFullName");
            Class<?> clazz = loader.loadClass(clsName);
            String methodName = (String) argMap.get("staticMethodName");
            Method method = clazz.getDeclaredMethod(methodName, new Class[]{String.class});
            String argJsonStr = (String) argMap.get("args");
            String res = method.invoke(null, argJsonStr).toString();
            // I've tried to concat window.res in C code, but failed.
            return "window.res='" + res + "'";

        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e);
            return e.getMessage();
        }

    }


    private static class ParentLastURLClassLoader extends ClassLoader {
        private ChildURLClassLoader childClassLoader;

        /**
         * This class allows me to call findClass on a classloader
         */
        private static class FindClassClassLoader extends ClassLoader {
            public FindClassClassLoader(ClassLoader parent) {
                super(parent);
            }

            @Override
            public Class<?> findClass(String name) throws ClassNotFoundException {
                return super.findClass(name);
            }
        }

        /**
         * This class delegates (child then parent) for the findClass method for a URLClassLoader.
         * We need this because findClass is protected in URLClassLoader
         */
        private static class ChildURLClassLoader extends URLClassLoader {
            private FindClassClassLoader realParent;

            public ChildURLClassLoader(URL[] urls, FindClassClassLoader realParent) {
                super(urls, null);

                this.realParent = realParent;
            }

            @Override
            public Class<?> findClass(String name) throws ClassNotFoundException {
                try {
                    Class<?> loaded = super.findLoadedClass(name);
                    if (loaded != null)
                        return loaded;
                    // first try to use the URLClassLoader findClass
                    return super.findClass(name);
                } catch (ClassNotFoundException e) {
                    // if that fails, we ask our real parent classloader to load the class (we give up)
                    return realParent.loadClass(name);
                }
            }
        }

        public ParentLastURLClassLoader(List<URL> classpath) {
            super(Thread.currentThread().getContextClassLoader());

            URL[] urls = classpath.toArray(new URL[classpath.size()]);

            childClassLoader = new ChildURLClassLoader(urls, new FindClassClassLoader(this.getParent()));
        }

        @Override
        protected synchronized Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException {
            try {
                // first we try to find a class inside the child classloader
                return childClassLoader.findClass(name);
            } catch (ClassNotFoundException e) {
                // didn't find it, try the parent
                return super.loadClass(name, resolve);
            }
        }
    }
}
