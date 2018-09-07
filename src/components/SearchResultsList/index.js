import React from 'react';
import { List, Image } from 'semantic-ui-react'
import './SearchResultsList.css'

const SearchResultsList = props => (
  <List divided relaxed>
    { props.docs.map(doc =>
      <List.Item key={doc.key}>
        {
          doc.cover_edition_key
          ?
          <Image src={`http://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-M.jpg`} />
          :
          <div className="ui image placeholder" />
        }
        <List.Content>
          <List.Header>
            { doc.title }
          </List.Header>
        </List.Content>
      </List.Item>
    ) }
 </List>
);

export default SearchResultsList;
