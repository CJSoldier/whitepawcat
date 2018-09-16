import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Tabs, Select, Input, Row, Col, Form, Button } from 'antd';
import 'whatwg-fetch';
// fix windows IE11 Symbol undefined
import 'babel-polyfill';


const Search = Input.Search;
const { TextArea } = Input;
const FormItem = Form.Item;

const TabPane = Tabs.TabPane;
const Option = Select.Option;

var MD5 = function(d){var result = M(V(Y(X(d),8*d.length)));return result.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
class SmallTool extends Component {

  state = {
    md5:"",
    changedCase:"",
    toggleFlag:true,
    json:""
  }
  formatJsonText = (value) => {
    let originJsonStrDom = this.refs.originJsonStrDom;
    let textareaDom = ReactDOM.findDOMNode(originJsonStrDom);
    //console.log(textareaDom.value);
    if(!textareaDom.value){
      this.setState({ json:"" });
    } else {
      try {
        let jsonObj = JSON.parse(textareaDom.value);
        this.setState({ json:JSON.stringify(jsonObj, null, 2) });
      } catch(err){
        this.setState({ json:err.stack });
      }
    }
  }

  encryptMD5 = (value) => {
    this.setState({ md5:MD5(value) });
  }
  toggleCase = (value) => {
    var flag = this.state.toggleFlag;
    this.setState({ changedCase:flag ? value.toUpperCase() : value.toLowerCase(), toggleFlag:!flag });
  }
  render() {
    const md5Value = this.state.md5
    const caseStr = this.state.changedCase
    const jsonStr = this.state.json;
    return (
      <div>
        <Row>
          <Col span={12}>
            <div>
            <Search placeholder="input search text" enterButton="MD5加密" size="large" onSearch={this.encryptMD5} style={{ width: "90%" }} />
            <pre className="language-bash">
             {md5Value}
            </pre>
            </div>
          </Col>
          <Col span={12}>
            <Search placeholder="input search text" enterButton="大/小写转换" size="large" onSearch={this.toggleCase} style={{ width: "90%" }}/>
              <pre>
              {caseStr}
              </pre>
            </Col>
        </Row>
        json format<br/>
        <Row>
          <Col span={12}><TextArea rows={22} style={{ width: "90%" }} onChange={this.formatJsonText} ref="originJsonStrDom" /></Col>
          <Col span={12}>
          <pre>
            {jsonStr}
          </pre>
          </Col>
        </Row>
      </div>
    );
  }
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ElasticSearch extends Component {
  state = {
    resData:""
  }
  template = {
    all:'{"method":"post","url":"'+preference.esUrl+'_search","dsl":{"query":{"match_all":{}}}}',
    exist:'{"method":"post","url":"'+preference.esUrl+'_search","dsl":{"query":{"exists":{"field":"name"}}}}',
    not_exist:'{"method":"post","url":"'+preference.esUrl+'_search","dsl":{"query":{"bool":{"must_not":[{"exists":{"field":"name"}}]}}}}',
    query_string:'{"method":"post","url":"'+preference.esUrl+'_search","dsl":{"query":{"query_string":{"query":"name:*"}}}}',
    nested_exist:'{"method":"post","url":"'+preference.esUrl+'_search","dsl":{"query":{"nested":{"path":"friends","query":{"bool":{"must":[{"exists":{"field":"friends.age"}}]}}}}}}',
    aggregation:'{"method":"post","url":"'+preference.esUrl+'_search","dsl":{"query":{"match_all":{}},"size":0,"aggregations":{"age_count":{"sum":{"field":"age"}},"name_count":{"value_count":{"field":"message.keyword"}}}}}',
    token:'{"method":"post","url":"'+preference.esUrl+'_analyze","dsl":{"tokenizer":"ik_smart","text":"人生有多少个十年"}}',
    view_mapping:'{"method":"get","url":"'+preference.esUrl+'_mapping","dsl":{}}',
    debug:'{"method":"post","url":"'+preference.esUrl+'_search?explain","dsl":{"query":{"query_string":{"query":"name:kimchy AND title:trying out Elasticsearch"}}}}',
    nested_upsert:'{"method":"put","url":"'+preference.esUrl+'info/1122/_update","dsl":{"script":{"lang":"painless","inline":"if(ctx._source.borrows == null){ctx._source.borrows = [];} int j=-1; for(int i=0; i<ctx._source.borrows.length; i++){if(ctx._source.borrows[i].id==params.new_borrow.id){j=i;break;} } if(j == -1){ctx._source.borrows.add(params.new_borrow);}else{def oldDoc=ctx._source.borrows[j];Set keys = new HashSet(params.new_borrow.keySet());for(key in keys){oldDoc[key] = params.new_borrow[key];} ctx._source.borrows[j]=oldDoc;}","params":{"new_borrow":{"boId":"3344","title":"haha","createTime":"2018-08-29 10:59:509"}}},"upsert":{"id":"1122","name":"梁非凡","age":23,"borrows":[{"boId":"3344","title":"haha","createTime":"2018-08-29 10:59:509"}]}}}',
    create_mapping:'{"method":"put","url":"'+preference.esUrl+'","dsl":{"settings":{"number_of_shards":8,"index":{"analysis":{"analyzer":{"default":{"type":"ik_smart"}}},"max_result_window":"1000000"}},"mappings":{"info":{"properties":{"dataSource":{"type":"long"},"name_t":{"type":"long"}},"dynamic_templates":[{"versatility":{"match_pattern":"regex","match":"^.+_[t]$","mapping":{"type":"text","fields":{"keyword":{"type":"keyword"}}}}},{"dyfields_date":{"match":"*_date","match_mapping_type":"*","mapping":{"type":"date","format":"epoch_millis"}}},{"dyfields_l":{"match":"*_l","match_mapping_type":"*","mapping":{"type":"long"}}},{"dyfields_d":{"match":"*_d","match_mapping_type":"*","mapping":{"type":"double"}}},{"dyfields_text":{"match":"*_text","match_mapping_type":"*","mapping":{"type":"text"}}}]}}}}',
    update_mapping:'{"method":"put","url":"'+preference.esUrl+'_mapping/info","dsl":{"properties":{"phone":{"type":"text"}}}}',
    update_doc:'{"method":"put","url":"'+preference.esUrl+'info/111/","dsl":{"user":"kimchy","postDate":"2009-11-15T14:12:12","message":"index me"}}',
    delete_doc:'{"method":"delete","url":"'+preference.esUrl+'info/111","dsl":{}}',
    update_par_rep:'{"method":"put","url":"'+preference.esUrl+'_settings","dsl":{"index":{"number_of_shards":5,"number_of_replicas":3}}}'
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //var postdata = JSON.parse(values.postdata);
        var fetchOpt = {
          method: values.method, 
          mode: 'cors',
        }
        if(values.method !== 'get' && values.method !== 'delete' ){
          fetchOpt.headers = {'Content-Type': 'application/json'};
          fetchOpt.body = values.postdata;
        }
        fetch(values.url, fetchOpt).then(response => {
          response.json().then(data => {
            this.setState({resData:JSON.stringify(data, null, 2)});
          });
          
        });
      }
    });
  }

  changeTemplateOpt = (v) => {
    let selectionStr = Reflect.get(this.template, v);
    let selection = JSON.parse(selectionStr);
    this.props.form.setFieldsValue({url:selection.url});
    this.props.form.setFieldsValue({method:selection.method});
    this.props.form.setFieldsValue({postdata:JSON.stringify(selection.dsl, null, 2)});
  }


  render() {
    const resData = this.state.resData
    const { getFieldsValue, getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    return (
      <div>
        <Row>
          <Col span={12}>
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('url', {
                rules: [{ required: true, message: '请输入url' }],
              })(
                <Input placeholder="http://192.168.5.100:9200" />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('postdata', {
                rules: [{ required: true, message: '请输入请求参数' }],
              })(
                <TextArea rows={8} style={{ width: "100%" }} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('method', {
          
              })(
                <Input hidden="true" />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                提交
              </Button>&nbsp;&nbsp;
              
              <div>
              DSL模板：
              <FormItem>
              {getFieldDecorator('templateOpt', {
                
              })(
                <Select
                onChange={this.changeTemplateOpt}
                dropdownMatchSelectWidth={false}
                >
                  <Option value="all">查询全部</Option>
                  <Option value="exist">包含某个字段</Option>
                  <Option value="not_exist">不包含某个字段</Option>
                  <Option value="query_string">query_string(支持*)</Option>
                  <Option value="nested_exist">nested包含某个字段</Option>
                  <Option value="aggregation">聚合统计</Option>
                  <Option value="token">查看分词</Option>
                  <Option value="view_mapping">查看mapping</Option>
                  <Option value="debug">debug调试</Option>
                  <Option value="nested_upsert">nested局部更新(upsert)</Option>
                  <Option value="create_mapping">新建mapping</Option>
                  <Option value="update_mapping">更新mapping</Option>
                  <Option value="update_doc">新增/更新文档</Option>
                  <Option value="delete_doc">删除文档</Option>
                  <Option value="update_par_rep">修改副本/分片数</Option>
                </Select>
              )}
              
              </FormItem>
              </div>
            </FormItem>
          </Form>
          </Col>
          <Col span={12}>
          <pre>
            {resData}
          </pre>

          </Col>
          
        </Row>
      </div>
    );
  }
}
const ElasticSearchForm = Form.create()(ElasticSearch);

// hbase begin
class HBase extends Component {
  state = {
    resData:""
  }
  template = {
    all:'{"method":"post","url":"'+preference.esUrl+'_search","dsl":{"query":{"match_all":{}}}}',
    exist:'{"method":"post","url":"'+preference.esUrl+'_search","dsl":{"query":{"exists":{"field":"name"}}}}',
    
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var param = {};
        param.jarName="whitepawcat-hbase120.jar";
        param.classFullName="controller.MainController";
        param.staticMethodName="scanRecord";
        
        var hUrl = this.props.form.getFieldValue("url");
        if(!hUrl){
          hUrl = preference.hbaseUrl;
        }

        var hPort = this.props.form.getFieldValue("port");
        if(!hPort){
          hPort = preference.hbasePort;
        }

        var nsTable = this.props.form.getFieldValue("namespaceTable");
        if(!nsTable){
          nsTable = preference.hbaseNamespaceTable;
        }
        param.args=JSON.stringify({url:hUrl, port:hPort, namespaceTable:nsTable});
        // call C method, when develop, comment this line and populate fake data.
        // C method will call Java method, then C method will assign global variable res.
        // C method was registered in main.c(via external_invoke_cb)
        external.invoke(JSON.stringify(param));
        this.setState({resData:window.res});

      }
    });
  }

  handleGet = (e) => {
    e.preventDefault();

    var hUrl = this.props.form.getFieldValue("url");
    if(!hUrl){
      hUrl = preference.hbaseUrl;
    }

    var hPort = this.props.form.getFieldValue("port");
    if(!hPort){
      hPort = preference.hbasePort;
    }

    var nsTable = this.props.form.getFieldValue("namespaceTable");
    if(!nsTable){
      nsTable = preference.hbaseNamespaceTable;
    }

    var rkey = this.props.form.getFieldValue("rowkey");
    if(!rkey){
      rkey = preference.rowkey;
    }
    
    var param = {};
    param.jarName="whitepawcat-hbase120.jar";
    param.classFullName="controller.MainController";
    param.staticMethodName="getRecord";
    param.args=JSON.stringify({url:hUrl, port:hPort, namespaceTable:nsTable, rowkey:rkey});
    external.invoke(JSON.stringify(param));
    this.setState({resData:window.res});

  }

  handlePut = (e) => {
    e.preventDefault();

    var hUrl = this.props.form.getFieldValue("url");
    if(!hUrl){
      hUrl = preference.hbaseUrl;
    }

    var hPort = this.props.form.getFieldValue("port");
    if(!hPort){
      hPort = preference.hbasePort;
    }

    var nsTable = this.props.form.getFieldValue("namespaceTable");
    if(!nsTable){
      nsTable = preference.hbaseNamespaceTable;
    }

    var rkey = this.props.form.getFieldValue("rowkey");
    if(!rkey){
      rkey = preference.rowkey;
    }

    var pdata = this.props.form.getFieldValue("postdata");
    if(!pdata){
      this.setState({resData:'请输入值'});
      return;
    }
    try {
      JSON.parse(pdata);
    } catch (error) {
      this.setState({resData:'json格式错误'});
      return;
    }
    
    var param = {};
    param.jarName="whitepawcat-hbase120.jar";
    param.classFullName="controller.MainController";
    param.staticMethodName="upsertRecord";
    param.args=JSON.stringify({url:hUrl, port:hPort, namespaceTable:nsTable, rowkey:rkey, kvs:pdata});
    external.invoke(JSON.stringify(param));
    this.setState({resData:window.res});
  }

  changeVersionOpt = (v) => {
    /*
    let selectionStr = Reflect.get(this.template, v);
    let selection = JSON.parse(selectionStr);
    this.props.form.setFieldsValue({url:selection.url});
    this.props.form.setFieldsValue({method:selection.method});
    this.props.form.setFieldsValue({postdata:JSON.stringify(selection.dsl, null, 2)});
    console.log('aassssfsf   '+selection);
    */
  }


  render() {
    const resData = this.state.resData
    const { getFieldValue, getFieldsValue, getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    return (
      <div>
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <Row>
          <Col span={4}>
          
            <FormItem>
              {getFieldDecorator('url', {
                rules: [{ required: false, message: '请输入url' }],
              })(
                <Input placeholder={preference.hbaseUrl} style={{ width: "95%" }} />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('namespaceTable', {
                rules: [{ required: false, message: '请输入命名空间和表名' }],
              })(
                <Input placeholder={preference.hbaseNamespaceTable} style={{ width: "95%" }} />
              )}
            </FormItem>
            
            <FormItem>
              <Button
                type="dashed"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                scan
              </Button>&nbsp;&nbsp;
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                onClick={this.handleGet}
                disabled={hasErrors(getFieldsError())}
              >
                get
              </Button>&nbsp;&nbsp;
            </FormItem>
            <FormItem>
              <Button
                type="danger"
                onClick={this.handlePut}
                disabled={hasErrors(getFieldsError())}
              >
                put
              </Button>&nbsp;&nbsp;
            </FormItem>
          
          </Col>
          <Col span={4}>
            <FormItem>
              {getFieldDecorator('port', {
                rules: [{ required: false, message: '请输入端口号' }],
              })(
                <Input placeholder={preference.hbasePort} style={{ width: "95%" }} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('rowkey', {
                rules: [{ required: false, message: '请输入rowkey' }],
              })(
                <Input placeholder={preference.rowkey} style={{ width: "95%" }} />
              )}
            </FormItem>
            
          </Col>
          <Col span={4}>
            <FormItem>
              {getFieldDecorator('templateOpt', {
                
              })(
                <Select
                onChange={this.changeVersionOpt}
                dropdownMatchSelectWidth={false}
                >
                  <Option value="hbase1.2">hbase1.2-cdh(currently support)</Option>
                  <Option value="hbase0.9">hbase0.9-cdh(TODO)</Option>
                </Select>
              )}
              </FormItem>
              <FormItem>
              {getFieldDecorator('postdata', {
                rules: [{ required: false, message: '请输入请求参数' }],
              })(
                <TextArea rows={4} style={{ width: "100%" }} placeholder={preference.hbasePutData} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
          <pre>
            {resData}
          </pre>

          </Col>
          
        </Row>
        </Form>
        
      </div>
    );
  }
}
const HBaseForm = Form.create()(HBase);
// hbase end


class WebConsole extends Component {
  constructor() {
    super();
    var tabBar = document.getElementsByClassName("ant-tabs-bar")[0];
    var tabBarStyle = window.getComputedStyle(document.getElementsByClassName("ant-tabs-bar")[0], null);
    var tabBarRealHeight = parseInt(tabBar.offsetHeight) + parseInt(tabBarStyle.marginTop) + parseInt(tabBarStyle.marginBottom)
    this.state = {
      iFrameHeight: ((document.body.clientHeight || document.documentElement.clientHeight) - tabBarRealHeight - 6) + 'px'
    }
  }
  
  render() {
    return (
      <iframe 
        style={{width:'100%', height:this.state.iFrameHeight, overflow:'auto'}}

        ref="iframe" 
        src="http://localhost:23333" 
        width="100%" 
        scrolling="no" 
        frameBorder="0"
    />
    );
  }

}


class HomePage extends Component {
  state = {
    version: '1.x',
  }

  changeVersion = (version) => {
    this.setState({ version });
  }

  render() {
    return (
      <div>
        <Tabs version={this.state.version} type="card">
          <TabPane tab="小工具" key="1"><SmallTool/></TabPane>
          <TabPane tab="Mysql" key="2">Mysql</TabPane>
          <TabPane tab="ES" key="3"><ElasticSearchForm/></TabPane>
          <TabPane tab="Hbase" key="4"><HBaseForm/></TabPane>
          <TabPane tab="Hive" key="5">Hive</TabPane>
          <TabPane tab="Kafka" key="6">Kafka</TabPane>
          <TabPane tab="ssh" key="7"><WebConsole/></TabPane>
          <TabPane tab="25min" key="8">take a break</TabPane>
        </Tabs>
      </div>
    );
  }
}

ReactDOM.render(<HomePage />, document.getElementById('root'));

/*

<div style={{ marginBottom: 16 }}>
          版本号：
          <Select
            value={this.state.version}
            onChange={this.changeVersion}
            dropdownMatchSelectWidth={false}
          >
            <Option value="1">1.x</Option>
            <Option value="2">2.x</Option>
            <Option value="3">3.x</Option>
            <Option value="4">4.x</Option>
          </Select>
        </div>
*/