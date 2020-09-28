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
                  folder_id: event.target.folders.value,
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
             console.log(JSON.stringify(note))
             return response.json()
             })
             .then(responseJSON => this.context.handleAddNote(responseJSON))
        }
       
        validateName = () => {
          if (this.context.newNote.name.value.length === 0) {
            return 'Name is required'
          }
        }
       
        render() {
          return (
               <div>
                    <h2 className='add-notes'>Add New Note</h2>
                    <form className="add-notes" onSubmit={event => this.handleNoteSubmit(event)}>
                         <label htmlFor="name">
                              Name
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
                              required

                         />
                         <label htmlFor="content">
                              Description
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
                              required
                         />
                         <label htmlFor="folders">Select a Folder</label>
                         <select
                              name="folders"
                              id="folders"
                              aria-required="true"
                              aria-label="Select a folder"
                         >
                              {this.getFolders()}
                         </select>
                         <button type="submit">Submit</button>
                         {this.context.newNote.name.touched && <p>{this.validateName()}</p>}
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