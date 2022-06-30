let publishableKey;
function getConfig() {
    return fetch("/config", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        // Set up Stripe Elements
        stripeElements(response.publishableKey);
      });
  }
getConfig();


var stripeElements = (publishableKey) => {
    const stripe = Stripe(publishableKey);
    const elements = stripe.elements();


    const card = elements.create('card',{hidePostalCode: true});
    card.mount('#card-element');

    const form = document.querySelector('#cardForm',{ hidePostalCode: false});
    const errorEl = document.getElementById('#card-errors');


    const stripeTokenHandler = token => {
        const hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'stripeToken');
        hiddenInput.setAttribute('value', token.id);
        form.appendChild(hiddenInput);    
        form.submit();
    };  

    /* Handle validation errors */ 
    card.addEventListener('change', event => {
        var displayError = document.getElementById('card-errors');
    
        if (event.error) {
        displayError.textContent = event.error.message;
        } else {
        displayError.textContent = ''; 
        }
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        var errorEl = document.getElementById('card-errors');
        stripe.createToken(card).then(res => {
            if (res.error) errorEl.textContent = res.error.message;
            else {            
                stripeTokenHandler(res.token);
            }
        });
    });
}  
