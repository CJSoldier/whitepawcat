
#define WEBVIEW_IMPLEMENTATION

#include "webview.h"
#include <stdio.h>
#include <unistd.h> 
#include <jni.h>
#include <string.h>


// get current execution directory
#ifdef WEBVIEW_WINAPI
	#define GetCurrentDir(buff, size) (_getcwd(buff, *size))
	#define PATH_SEPARATOR "\\"
#elif defined DWEBVIEW_GTK
	#include <unistd.h>
	//#define GetCurrentDir getcwd
    #define GetCurrentDir(buff, size) (getcwd(buff, *size))
	#define PATH_SEPARATOR "/"
#else
	// WEBVIEW_COCOA for mac os
    #include <mach-o/dyld.h>
    #define GetCurrentDir(buff, size) {_NSGetExecutablePath(buff, size);buff[strlen(buff)-1-11]='\0';}
	#define PATH_SEPARATOR "/"
    #define MAX_PATH 260
#endif

static void GetCurrentExecutableDir(char *buff, uint32_t *size) {
  GetCurrentDir( buff, size );
}
char *str_replace(char *orig, char *rep, char *with) {
    char *result;
    char *ins;
    char *tmp;
    int len_rep;
    int len_with;
    int len_front;
    int count;

    if (!orig || !rep)
        return NULL;
    len_rep = strlen(rep);
    if (len_rep == 0)
        return NULL;
    if (!with)
        with = "";
    len_with = strlen(with);
    ins = orig;
    for (count = 0; tmp = strstr(ins, rep); ++count) {
        ins = tmp + len_rep;
    }

    tmp = result = malloc(strlen(orig) + (len_with - len_rep) * count + 1);

    if (!result)
        return NULL;

    while (count--) {
        ins = strstr(orig, rep);
        len_front = ins - orig;
        tmp = strncpy(tmp, orig, len_front) + len_front;
        tmp = strcpy(tmp, with) + len_with;
        orig += len_front + len_rep; // move to next "end of rep"
    }
    strcpy(tmp, orig);
    return result;
}

// current executable path, oh, I misunderstood what working path and executable path is.It should be currentExecutingDir
char *currentWorkingDir;

// one process can only create one jvm instance, just let them be global
JavaVM         *vm;
JNIEnv         *env;
JavaVMInitArgs  vm_args;
jint            res;
jclass          cls;
jmethodID       mid;
jstring callJavaMethod(char *javaArgs){

    // convention over configuration?
    char *jarName = "whitepawcat-core.jar";
    char *classFullName = "controller.MainController";
    char *staticMethodName = "main";
    if(vm == NULL){
        webview_debug("jar hasn't been loaded.........");
        
        char *jarPath = malloc(strlen("-Djava.class.path=") + strlen(currentWorkingDir) + strlen("kernel/") + strlen(jarName) + 1);
        strcpy(jarPath, "-Djava.class.path=");
        strcat(jarPath, currentWorkingDir);
        strcat(jarPath, "kernel/");
        strcat(jarPath, jarName);
        webview_debug(jarPath);
        JavaVMOption options[1];


        // "-Djava.class.path=/Users/xxx/Desktop/ddd/kernel/whitepawcat.jar"
        options[0].optionString    = jarPath;
        vm_args.options            = options;
        vm_args.nOptions           = 1;
        vm_args.ignoreUnrecognized = JNI_TRUE;
        vm_args.version  = JNI_VERSION_1_8;

        res = JNI_CreateJavaVM(&vm, (void **)&env, &vm_args);
        if (res != JNI_OK) {
            webview_debug("Failed to create Java VMn");
            return NULL;
        }

        // convention over configuration?
        char *classFullPath = "controller/MainController";

        cls = (*env)->FindClass(env, classFullPath);
        if (cls == NULL) {
            webview_debug("Failed to find class");
            webview_debug(classFullName);
            return NULL;
        }

        mid = (*env)->GetStaticMethodID(env, cls, staticMethodName, "(Ljava/lang/String;)Ljava/lang/String;");
   
    }

    jstring arg_str = (*env)->NewStringUTF(env, javaArgs);
    jstring result_str = (*env)->CallStaticObjectMethod(env, cls, mid, arg_str);

    return result_str;
}

static void route(struct webview *w, const char *jsonStr) {
 
    jstring result_str = callJavaMethod(jsonStr);

    const char *str = (*env)->GetStringUTFChars(env, result_str, 0);

    // sorry you'll see nothing when str contain chinese characters.In macos you can print it in Java
    //webview_debug(str);


    // I tried to concat window.res here, but failed :(
    // char *javaRtnStr = malloc(strlen("window.res='") + strlen(str) + strlen("'") + 1);
	// strcpy(javaRtnStr, "window.res='");
	// strcat(javaRtnStr, str);
	// strcat(javaRtnStr, "'");
    // webview_eval(w, javaRtnStr);

    // tell js I'm back
	webview_eval(w, str);
    (*env)->ReleaseStringUTFChars(env, result_str, str);
    

}

#ifdef WIN32
int WINAPI WinMain(HINSTANCE hInt, HINSTANCE hPrevInst, LPSTR lpCmdLine,
	int nCmdShow) {
#else
int main() {
#endif

    
	char buff[MAX_PATH];
    // get current executable file path
    uint32_t size = MAX_PATH;
    GetCurrentExecutableDir(buff, &size);
    char executeDir[MAX_PATH];

	strcat (buff,PATH_SEPARATOR);
    
    strcpy(executeDir, buff);
    currentWorkingDir = executeDir;
	strcat (buff,"gui/index.html");
	
	struct webview webview = {
      .title = "白爪猫",
      .url = buff,
      .width = 800,
      .height = 600,
      .debug = 1,
      .resizable = 1,
	  .external_invoke_cb = route
	  };

	webview_init(&webview);
	int blocking = 1;
	webview_set_title(&webview, "白爪猫");
	while (webview_loop(&webview, blocking) == 0){}
	webview_exit(&webview);
    
	return 0;
}