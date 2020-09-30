import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from '../config'
import ApiContext from '../ApiContext';
import './AddNote.css'

export default class AddNote extends Component {
     static contextType = ApiContext;
     
        getFolders = () => {
          return this.context.folders.map(folder => (
            <option key={folder.id} name={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))
        }
     
        handleNoteSubmit = event => {
                event.preventDefault()
                const newNote = {
                  name: event.target.name.value,
                  content: event.target.content.value,
                  folderId: event.target.folders.value,
                  modified: new Date(),
                }
                console.log(newNote);
                this.addNewNote(newNote)
                this.props.history.push('/');
              }

        addNewNote = note => {

        note.modified = new Date(note.modified);
        
        fetch(`${config.API_ENDPOINT}/notes`, {
             method: 'POST',
             headers: {
             'Content-Type': 'application/json',
             },
             body: JSON.stringify(note),
        })
             .then(response => {
             if (!response.ok){
                  throw new Error ('Sorry, we could not add note')
             } 
             return response.json()
             })
             .then(responseJSON => this.context.handleAddNote(responseJSON))
             .catch (error =>console.log(error))
        }
       
        validateName() {
          if (this.context.newNote.name.value.length === 0) {
            return 'Name is required'
          } else if ( this.context.newNote.name.value.length < 3 ) {
               return 'Name must be at least 3 characters.'
             }
        }

        validateDescription() {
          if (this.context.newNote.content.value.length === 0) {
            return 'Description is required'
          } else if ( this.context.newNote.content.value.length < 3 ) {
               return 'Description must be at least 3 characters.'
             }
        }
       
        render() {
          return (
               <div>
                    <h2 className='add-notes'>Add New Note</h2>
                    <form className="add-notes" onSubmit={event => this.handleNoteSubmit(event)}>
                         <label htmlFor="name">
                              Name {' '}
                         </label>
                         <input
                              type="text"
                              name="name"
                              id="name"
                              aria-required="true"
                              aria-label="Name"
                              onChange={event =>
                              this.context.updateNewNoteData(event.target.name, event.target.value)
                              }
                         />
                         {this.context.newNote.name.touched && <p>{this.validateName()}</p>}
                         <br />
                         <br />
                         <label htmlFor="content">
                              Description {' '}
                         </label>
                         <input
                              type="text"
                              name="content"
                              id="content"
                              aria-required="true"
                              aria-label="Description"
                              onChange={event =>
                              this.context.updateNewNoteData(event.target.name, event.target.value)
                              }
                         />
                         {this.context.newNote.content.touched && <p>{this.validateDescription()}</p>}
                         <br />
                         <br />
                         <label htmlFor="folders">Select a Folder {' '}</label>
                         <select
                              name="folders"
                              id="folders"
                              aria-required="true"
                              aria-label="Select a folder"
                         >
                              {this.getFolders()}
                         </select>
                         <br />
                         <br />
                         <button 
                              type="submit" 
                              disabled={this.validateName() ||
                                   this.validateDescription()
                              }    
                         
                         >
                              Submit
                         </button>
                    </form>
               </div>
          )
     }
}

AddNote.propTypes = {
     history: PropTypes.object, 
     location: PropTypes.object,
     match: PropTypes.object
   }