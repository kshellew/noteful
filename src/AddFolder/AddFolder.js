import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from '../config'
import ApiContext from '../ApiContext';
import './AddFolder.css'

export default class AddFolder extends Component {
     static contextType = ApiContext;

    
     handleSubmit(event) {
          event.preventDefault();
          const newFolder = event.target.newFolder.value;
          this.addFolder(newFolder);
          this.props.history.goBack();
        }
      

     addFolder(name) {
          fetch(`${config.API_ENDPOINT}/folders/`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({name})
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Unable to add folder to the database')
            }
            return response.json();
          })
          .then(response => this.context.addFolder(response))
        }

     updateFolder(event) {
          const newName = event.target.value;
          this.context.updateNewFolderName(newName);
     }
     
     validateName() {
          const name = this.context.newFolder.name.trim();
          if (name.length === 0) {
            return 'Name is required'
          } else if ( name.length < 3 ) {
            return 'Must be at least 3 characters.'
          }
        }
      

     render() {

          return (
               <div>
                    <h2 className='add-folder'>Add A New Folder</h2>
                    <form className="add-folder" onSubmit={event => this.handleSubmit(event)}>
                    <label htmlFor="newFolder">
                         Name:
                    </label>
                    <input
                         type="text"
                         name="newFolder"
                         id="newFolder"
                         aria-required="true"
                         aria-label="Name"
                         onChange={(event) => this.updateFolder(event)}
                         />
                    <button type="submit" disabled={this.validateName()}>Submit</button>
                    {this.context.newFolder.touched && (<p>{this.validateName()}</p>)}       
                    </form>
               </div>
          )
     }
}

AddFolder.propTypes = {
     history: PropTypes.object, 
     location: PropTypes.object,
     match: PropTypes.object
   }