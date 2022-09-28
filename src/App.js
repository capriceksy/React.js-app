import React, { Component } from 'react';
import TOC from './components/TOC'
import Subject from './components/Subject';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Control from './components/Control';
import './App.css';

class App extends Component {
  constructor(props) {  // constructor : 컴포넌트 실행 시 가장 먼저 실행(초기화)
    super(props);
    this.max_content_id = 3;

    // state : 동적 상태 관리
    this.state={
      mode:'read',
      selected_content_id: 2,
      subject:{title:'WEB', sub:'World Wide Web!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'},
      ]
    }
  }

  // 선택한 컨텐츠와 일치하는 내용 찾기
  getReadContent() {  
    let i = 0;
    while(i < this.state.contents.length) {
      let data = this.state.contents[i]
      if(data.id === this.state.selected_content_id) {
        return data;
      }
      i++;
    }
  }

  // 내용 불러오기
  getContent() {
    let _title, _desc, _article, _content = null;

    // Welcome
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}/>

    // Read
    } else if (this.state.mode === 'read') {
      _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}/>

    // Create
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc) {
        this.max_content_id++;
        // let _contents = this.state.contents.concat( 
        //   // push는 원본 데이터를 변경하기 때문에 데이터 변경이 없는 concat으로 배열에 데이터 추가함. Array.from으로 복제 > 추가 > state에 덮어씌우기도 가능.
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        let _contents = Array.from(this.state.contents);
        _contents.push({id:this.max_content_id, title: _title, desc: _desc})
        this.setState({
          contents: _contents,
          mode: 'read',
          selected_content_id:this.max_content_id,
        });
      }.bind(this)}/>

    // Update
    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc) {
          let _contents = Array.from(this.state.contents);
          let i = 0;
          while(i < _contents.length) {
            if(_contents[i].id === _id) {
              _contents[i] = {id: _id, title: _title, desc: _desc};
              break;
            }
            i++;
          }
          this.setState({
            contents : _contents,
            mode : 'read'
          })
        }.bind(this)} />
    }
    return _article;
  }

  render() {  // 렌더링
    console.log('App render');
    return (  // return 안에서는 반드시 가장 밖에는 하나의 태그만 사용해야 함
      <div className='App'>
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub} 
          onChangePage={function() {
          this.setState({mode:'welcome'});
        }.bind(this)}
        />
        <TOC
          onChangePage={function(id) {
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
            })
          }.bind(this)}
          data={this.state.contents}
        />
        <Control onChangeMode={function(_mode) {
          // Delete
          if(_mode === 'delete') {
            if(window.confirm('really?')) {
              let _contents = Array.from(this.state.contents);
              let i = 0;
              while(i < _contents.length) {
                if(_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i,1);
                  break;
                }
                i++;
              }
              this.setState({
                mode: 'welcome',
                contents: _contents
              });
              alert('deleted!');
            }
          } else {
            this.setState({
              mode:_mode
            });
          }
        }.bind(this)}/>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
