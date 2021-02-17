class AddressDTO {
    email: string;
    name: string;
}

export class MessageDTO {
  sender: AddressDTO;
  recipient: AddressDTO;
  body: string;
  subject: string;
}
 
export default MessageDTO;