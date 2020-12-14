export default class Login {
    contructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        })
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name=email]');
        const senhaInput = el.querySelector('input[name=password]');

        console.log(emailInput.value, senhaInput.value)
    }
}