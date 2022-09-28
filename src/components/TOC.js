import React, { Component } from "react";

class TOC extends Component {
  // 현재 화면과 클릭한 목록이 같은 id일 경우에는 목록을 새로 불러오지 않음 
  // shouldComponentUpdate(newProps, newState) {
  //   console.log("==>TOC render shouldComponentUpdate");
  //   if(this.props.data === newProps.data) {
  //     return false;
  //   }
  //   return true;
  // }
  render() {
    console.log('TOC render')
    let lists = [];
    let data = this.props.data;
    let i = 0;
    while(i < data.length) {
      lists.push(<li key={data[i].id}>
        <a 
          href={"/content/" + data[i].id}
          data-id={data[i].id}
          onClick={function(e) {
            e.preventDefault();
            this.props.onChangePage(e.target.dataset.id);
          }.bind(this)}
        > {data[i].title}</a></li>);
      i++;
    }
    return (
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    );
  }
}
export default TOC;