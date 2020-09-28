import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class AppErrors extends Component {
     constructor(props) {
          super(props);
          this.state = {
            hasError: false
          };
        }
    
     static getDerivedStateFromError(error) {
          return { hasError: true };
        }

        render() {
          if (this.state.hasError) {      
            return (
              <h2>Sorry about that! Something went wrong</h2>
            );
          }
          return this.props.children;
        }  
}

AppErrors.propTypes = {
     children: PropTypes.array
   }
   