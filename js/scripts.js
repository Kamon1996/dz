class User {
   constructor(data) {
      this.data = {
         id: data.id,
         name: data.name,
         email: data.email,
         address: data.address,
         phone: data.phone
      }
   }
   edit(obj, obj2 = this.data) {
      return obj2 = { ...obj2, ...obj };
   }

   get info() {
      return this.data;
   }
}

class Contacts extends User {
   constructor(data) {
      super(data);
   }
   #data = [];
   #id = 1;
   add(data) {
      let user = new User({ ...data, id: this.#id });
      this.#id++;
      this.#data.push(user.data);
      return user.data;
   }

   edit(id, obj) {
      return this.#data = this.#data.map(v => v.id === id ? super.edit(obj, v) : v
      )
   }

   remove(id) {
      return this.#data = this.#data.filter(v => v.id !== id)
   }

   get info() {
      return this.#data;
   }
}


class ContactsApp extends Contacts {
   constructor(data) {
      super(data);
      this.app = document.createElement('section');
      this.app.classList.add('contacts__app');
      document.body.appendChild(this.app);
      this.app.innerHTML = `
      <h3>ContactsApp</h3>
      <form class="new__user" action="">
         <input required type="text" name="name">
         <input required type="email" name="email">
         <input required type="text" name="city">
         <input required type="text" name="phone">
         <button class="add" type="">add new</button>
      </form>

      <div class="items"></div>
      `
      this.items = document.querySelector('.items');
      this.addButton = document.querySelector('.add');
      this.inputName = document.querySelector('input[name="name"]');
      this.inputEmail = document.querySelector('input[name="email"]');
      this.inputAddress = document.querySelector('input[name="city"]');
      this.inputPhone = document.querySelector('input[name="phone"]');
      this.addButton.addEventListener("click", e => {
         if (
            this.inputName.value == "" ||
            this.inputEmail.value == "" ||
            this.inputAddress.value == "" ||
            this.inputPhone.value == "") {
            return;
         } else {
            data = {
               name: this.inputName.value,
               email: this.inputEmail.value,
               address: this.inputAddress.value,
               phone: this.inputPhone.value
            }
            this.onAdd(data);
            this.inputName.value = this.inputEmail.value = this.inputAddress.value = this.inputPhone.value = "";
         }
         e.preventDefault();
      })
   }


   onAdd(data) {
      super.add(data);
      this.get();
   }

   onEdit(id, obj) {
      super.edit(id, obj);
      this.get();
   }

   onRemove(id) {
      super.remove(id);
      this.get();
   }

   get() {
      this.items.innerHTML = "";
      super.info.forEach(e => {
         this.items.innerHTML += `
      <div id="${e.id}" class="item">
         <div class="item__info">
            <div class="name">${e.name}
               <i class="fas fa-pen"></i>
            </div>
            <div class="email">${e.email}
               <i class="fas fa-pen"></i>
            </div>
            <div class="adress">${e.address}
               <i class="fas fa-pen"></i>
            </div>
            <div class="phone">${e.phone}
               <i class="fas fa-pen"></i>
            </div>
         </div>
         <button class="delete">delete
         </button>
      </div>
         `
      });
      this.names = document.querySelectorAll('.name');
      this.emails = document.querySelectorAll('.email');
      this.adresses = document.querySelectorAll('.adress');
      this.phones = document.querySelectorAll('.phone');
      this.deleteButtons = document.querySelectorAll('.delete');

      this.deleteButtons.forEach((e) => {
         e.addEventListener("click", () => {
            this.onRemove(+e.parentElement.id);
         })
      })
   }




}

let app = new ContactsApp({});
