import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'

const modalContent = {
  image: {
    src: '/assets/images/avatar/large/jenny.jpg',
    size: 'medium',
  },
  content: [
    <Header key='header'>Default Profile Image</Header>,
    <p key='p1'>We've found the following gravatar image associated with your e-mail address.</p>,
    <p key='p2'>Is it okay to use this photo?</p>,
  ],
}

const ModalExampleModalShorthand = () => (
  <Modal
    trigger={<Button>Show Modal</Button>}
    header='Select a Photo'
    content={modalContent}
  />
)

export default ModalExampleModalShorthand
