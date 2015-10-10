var React = require('react/addons');
var $ = require('jquery');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var ToDo = React.createClass({
  render: function() {
    var defaultClass = 'callout';
    defaultClass += this.props.done === "true" ? ' callout-success' : ' callout-info';

    return (
      <div className={defaultClass}>
        <i className='ficon ficon-checkmark mark-done' onClick={this.props.onClickDone}></i>

        <span>{this.props.value}</span>
        
        <i className='close' onClick={this.props.onClickClose}>&times;</i>
        <div className="time"><span>{new Date(this.props.date).toDateString()}</span></div>
      </div>
    )
  }
});

var ReactApp = React.createClass({
      getInitialState: function() {
        return {
          data: this.props.seed,
          inputValue: ""
        }
      },
      componentDidMount: function () {
        console.log('seed: ');
        console.log(this.props.seed );
        this.loadCommentsFromServer();
      },
      loadCommentsFromServer: function() {
        $.ajax({
          url: '/api/todolist',
          dataType: 'json',
          cache: false,
          success: function(data) {
            console.log(data);
            this.setState({
              data: data.todos,
              inputValue: ""
            });
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(status, err.toString());
          }.bind(this)
        });
      },
      handleChange: function(e) {
        this.setState({
          inputValue: e.target.value
        });
      },
      showTodoList: function(){
          var todos = this.state.data.map(function(todo, index) {
            return (
              <ToDo
              key={todo._id}
              value={todo.content}
              done={todo.done}
              date={todo.update_at} 
              onClickClose={this.removeTodo.bind(this, todo._id)}
              onClickDone={this.markTodoDone.bind(this, todo._id)}
            /> );
          }.bind(this));
          
          return todos;
      },
      removeTodo: function(id){
          console.log("remove " + id);
          
          $.ajax({
              type: 'POST',
              url: '/api/destory',
              data: {id: id},
              dataType: 'json',
              cache: false,
              success: function(data) {
                console.log(data);
                if(data.status == 200){
                  this.loadCommentsFromServer();
                }
                
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(status, err.toString());
              }.bind(this)
          });
          
      },
      markTodoDone: function(id){
        console.log("done " + id);
        
        $.ajax({
            type: 'POST',
            url: '/api/update',
            data: {id: id},
            dataType: 'json',
            cache: false,
            success: function(data) {
              console.log(data);
              if(data.status == 200){
                this.loadCommentsFromServer();
              }
              
            }.bind(this),
            error: function(xhr, status, err) {
              console.error(status, err.toString());
            }.bind(this)
        });
      },
      addTodo: function(e) {
        e.preventDefault();
        
        if(this.state.inputValue){
           $.ajax({
              type: 'POST',
              url: '/api/addtodo',
              data: {content: this.state.inputValue},
              dataType: 'json',
              cache: false,
              success: function(data) {
                console.log(data);
                if(data.status == 200){
                  this.loadCommentsFromServer();
                }
                
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(status, err.toString());
              }.bind(this)
            });
        }
        
        
      },
      render: function () {
        return (
          <div className='container'>
            <div className='col-xs-6 col-xs-offset-3'>
              <h1>NODE REACT TodoList</h1>
                
                <ReactCSSTransitionGroup transitionName="example">
                {this.showTodoList()}
                </ReactCSSTransitionGroup>
              
              <form
                className='form-inline todo-form col-xs-8 col-xs-offset-2'
                role='form'
                onSubmit={this.addTodo}>
                <div className='input-group'>
                  <label className='sr-only' htmlFor='todoInput'></label>
                  <input type='text' value={this.state.inputValue}
                    onChange={this.handleChange}
                    className='form-control'
                    placeholder='To do?'
                  />
                  <span className='input-group-btn'> 
                    <button className='btn btn-default'>Add Todo</button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        )
      }
  });
  

/* Module.exports instead of normal dom mounting */
module.exports = ReactApp;