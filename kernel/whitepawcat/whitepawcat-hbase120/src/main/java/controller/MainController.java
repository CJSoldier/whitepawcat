package controller;

import com.alibaba.fastjson.JSONObject;
import org.apache.commons.io.IOUtils;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.*;
import org.apache.hadoop.hbase.client.*;
import org.apache.hadoop.hbase.util.Bytes;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MainController {
    private static Map<String, Connection> connMap = new HashMap<String, Connection>();

    private static Connection getConn(String url, String port) {
        Connection conn = null;
        String key = url + "," + port;
        if (connMap.containsKey(key)) {
            conn = connMap.get(key);
        } else {
            Configuration conf = HBaseConfiguration.create();
            conf.set("hbase.zookeeper.quorum", url);
            conf.set("hbase.zookeeper.property.clientPort", port);
            try {
                conn = ConnectionFactory.createConnection(conf);
                connMap.put(key, conn);
                return conn;
            } catch (IOException e) {
                IOUtils.closeQuietly(conn);
            }
        }
        return conn;
    }

    public static String resultToString(Result result) {
        StringBuilder sb = new StringBuilder();
        for (Cell cell : result.rawCells()) {
            byte[] family = CellUtil.cloneFamily(cell);
            byte[] column = CellUtil.cloneQualifier(cell);
            byte[] value = CellUtil.cloneValue(cell);
            sb.append(Bytes.toString(family) + ":" + Bytes.toString(column) + " = " + Bytes.toString(value) + ", ");
        }
        String res = sb.substring(0, sb.length() - 2);
        return res;
    }

    public static String getRecord(String args) {
        Map map = JSONObject.parseObject(args, Map.class);
        String url = (String) map.get("url");
        String port = (String) map.get("port");
        Connection conn = getConn(url, port);
        String namespaceTable = (String) map.get("namespaceTable");
        String rowkey = (String) map.get("rowkey");

        try (Table table = conn.getTable(TableName.valueOf(namespaceTable))) {
            Result result = table.get(new Get(Bytes.toBytes(rowkey)));
            if (result.isEmpty()) {
                return "empty";
            }
            return resultToString(result);
        } catch (IOException e) {
            return e.getMessage();
        }
    }

    public static String scanRecord(String args) {
        Map map = JSONObject.parseObject(args, Map.class);
        String url = (String) map.get("url");
        String port = (String) map.get("port");
        Connection conn = getConn(url, port);
        String namespaceTable = (String) map.get("namespaceTable");
        try (Table table = conn.getTable(TableName.valueOf(namespaceTable))) {
            Scan scan = new Scan();
            scan.setMaxResultSize(5);
            try (ResultScanner scanner = table.getScanner(scan)) {
                List<Result> list = new ArrayList<>();
                StringBuilder sb = new StringBuilder();
                // double backslash!!! It seemes that C method GetStringUTFChars needs double backslash!
                scanner.forEach(e -> sb.append(resultToString(e) + "\\n"));
                return sb.toString();
            }
        } catch (IOException e) {
            return e.getMessage();
        }
    }

    public static String upsertRecord(String args) {
        Map map = JSONObject.parseObject(args, Map.class);
        String url = (String) map.get("url");
        String port = (String) map.get("port");
        Connection conn = getConn(url, port);
        String namespaceTable = (String) map.get("namespaceTable");
        String rowkey = (String) map.get("rowkey");
        String kvs = (String) map.get("kvs");
        try (Table table = conn.getTable(TableName.valueOf(namespaceTable))) {
            Put put = new Put(rowkey.getBytes());
            Map kvPairs = JSONObject.parseObject(kvs, Map.class);
            kvPairs.forEach((k, v) -> {
                String[] columnFamilyColumnNameArr = k.toString().split(",");
                put.addColumn(columnFamilyColumnNameArr[0].getBytes(), columnFamilyColumnNameArr[1].getBytes(), Bytes.toBytes(v.toString()));

            });
            table.put(put);
            return "success";
        } catch (IOException e) {
            return e.getMessage();
        }
    }
}
