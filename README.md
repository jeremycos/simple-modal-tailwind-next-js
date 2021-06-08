# Simple reusable Modal for Next js and Tailwind css

I needed a simple and easy reusable modal component for my next js and tailwind project and I didn't find a great and easy library. 

So I created this simple Modal.js file that enables me to create a custom default Modal for all of the modals of my project. You can add multiple modals easily to the same page. 

## 3 Steps 

1. Add `<div id="modal" />` before `<NextScript />` in your `_document.js` file. 
2. Import Modal.js component in your project.  Personnalize the default UI functionnal component with tailwind and add other animations if needed.
3. Import `{useModal, Modal}` from Modal component in any component where you need a Modal. For multiple Modals, add a name to your modal and rename closeModal and openModal functions. Like this `const {openModal : openModal1, closeModal : closeModal1} = useModal("modal1")`

Enjoy :p

