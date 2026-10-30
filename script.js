const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const loginMessage = document.getElementById("loginMessage");
const registerMessage = document.getElementById("registerMessage");

// LOGIN FORM

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        if (!email || !password) {
            loginMessage.textContent = "Please complete all fields.";
            return;
        }

        loginMessage.textContent =
            "Login form validated. Connect an authentication service to sign in.";
    });

    document.getElementById("forgotPassword").addEventListener(
        "click",
        function (event) {
            event.preventDefault();

            loginMessage.textContent =
                "Password recovery requires an authentication service.";
        }
    );
}

// REGISTRATION FORM

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const firstName =
            document.getElementById("firstName").value.trim();

        const lastName =
            document.getElementById("lastName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value;

        const mobile =
            document.getElementById("mobileNumber").value.trim();

        if (!firstName || !lastName || !email || !password || !mobile) {
            registerMessage.textContent =
                "Please complete all fields.";
            return;
        }

        if (password.length < 6) {
            registerMessage.textContent =
                "Your password must contain at least 6 characters.";
            return;
        }

        registerMessage.textContent =
            "Registration form validated. Connect a backend to create your account.";
    });

    document.getElementById("privacyLink").addEventListener(
        "click",
        function (event) {
            event.preventDefault();

            registerMessage.textContent =
                "Add your Privacy Policy page here.";
        }
    );

    document.getElementById("termsLink").addEventListener(
        "click",
        function (event) {
            event.preventDefault();

            registerMessage.textContent =
                "Add your Terms of Use page here.";
        }
    );
}

// SOCIAL BUTTONS

document.querySelectorAll(".social").forEach(function (button) {
    button.addEventListener("click", function () {
        const provider = button.dataset.provider;

        const message = loginForm ? loginMessage : registerMessage;

        message.textContent =
            provider + " sign-in requires an authentication provider.";
    });
});
/* ABOUT US NEWSLETTER */

const aboutNewsletterForm = document.getElementById(
    "aboutNewsletterForm"
);

if (aboutNewsletterForm) {
    aboutNewsletterForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const emailInput = document.getElementById(
            "aboutNewsletterEmail"
        );

        const message = document.getElementById(
            "aboutNewsletterMessage"
        );

        const email = emailInput.value.trim();

        if (!email) {
            message.textContent = "Please enter your email address.";
            return;
        }

        message.textContent =
            "Thank you for subscribing! Connect a newsletter service to receive updates.";

        aboutNewsletterForm.reset();
    });
}
const copyrightYear = document.querySelector(
    ".tw-footer-copyright"
);

if (copyrightYear) {
    copyrightYear.innerHTML = copyrightYear.innerHTML.replace(
        /©\s*\d{4}/,
        "© " + new Date().getFullYear()
    );
}
/* =========================================
   TRAVELWORLD TOURS PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const toursForm = document.getElementById("toursSearchForm");

    if (toursForm) {

        const locationInput = document.getElementById("toursLocation");
        const distanceInput = document.getElementById("toursDistance");
        const peopleInput = document.getElementById("toursPeople");

        const searchMessage = document.getElementById("toursSearchMessage");
        const noResults = document.getElementById("toursNoResults");

        const gallery = document.getElementById("toursGalleryGrid");
        const loadMoreButton = document.getElementById("toursLoadMore");
        const showAllButton = document.getElementById("toursShowAll");

        const extraDestinations = [
            {
                name: "JAPAN",
                location: "japan tokyo",
                distance: 180,
                people: 10,
                image: "photo-1493976040374-85c8e12f0c0e"
            },
            {
                name: "GREECE",
                location: "greece santorini",
                distance: 100,
                people: 8,
                image: "photo-1533105079780-92b9be482077"
            },
            {
                name: "SWITZERLAND",
                location: "switzerland",
                distance: 150,
                people: 12,
                image: "photo-1531366936337-7c912a4589a7"
            },
            {
                name: "EGYPT",
                location: "egypt cairo",
                distance: 120,
                people: 10,
                image: "photo-1539650116574-75c0c6d73f6e"
            }
        ];

        let extraIndex = 0;

        function getAllTourCards() {
            return document.querySelectorAll(
                ".tours-page .tours-card, " +
                ".tours-page .tours-gallery-card"
            );
        }

        function filterTours(event) {

            if (event) {
                event.preventDefault();
            }

            const location = locationInput.value.trim().toLowerCase();
            const distanceText = distanceInput.value.trim();
            const peopleText = peopleInput.value.trim();

            const distance = Number(distanceText);
            const people = Number(peopleText);

            if (distanceText !== "" &&
                (!Number.isFinite(distance) || distance < 0)) {

                searchMessage.textContent =
                    "Please enter a valid distance of zero or more.";

                return;
            }

            if (peopleText !== "" &&
                (!Number.isFinite(people) || people < 1)) {

                searchMessage.textContent =
                    "Please enter a valid number of travellers.";

                return;
            }

            searchMessage.textContent = "";

            let visibleCount = 0;

            getAllTourCards().forEach(function (card) {

                const cardLocation =
                    (card.dataset.location || "").toLowerCase();

                const cardDistance = Number(card.dataset.distance);
                const cardPeople = Number(card.dataset.people);

                const matchesLocation =
                    location === "" || cardLocation.includes(location);

                const matchesDistance =
                    distanceText === "" ||
                    cardDistance <= distance;

                const matchesPeople =
                    peopleText === "" ||
                    cardPeople >= people;

                const matches =
                    matchesLocation &&
                    matchesDistance &&
                    matchesPeople;

                card.hidden = !matches;

                if (matches) {
                    visibleCount++;
                }
            });

            noResults.hidden = visibleCount !== 0;

            if (loadMoreButton) {
                loadMoreButton.hidden =
                    location !== "" ||
                    distanceText !== "" ||
                    peopleText !== "" ||
                    extraIndex >= extraDestinations.length;
            }

            if (showAllButton) {
                showAllButton.hidden =
                    location === "" &&
                    distanceText === "" &&
                    peopleText === "";
            }
        }

        toursForm.addEventListener("submit", filterTours);

        function addDestination(destination) {

            const card = document.createElement("article");

            card.className = "tours-gallery-card tours-small";

            card.dataset.location = destination.location;
            card.dataset.distance = destination.distance;
            card.dataset.people = destination.people;

            const link = document.createElement("a");

            link.href = "tour-details.html?destination=" +
                encodeURIComponent(destination.name.toLowerCase());

            const img = document.createElement("img");

            img.src =
                "https://images.unsplash.com/" +
                destination.image +
                "?auto=format&fit=crop&w=700&q=85";

            img.alt = destination.name;

            const shade = document.createElement("div");
            shade.className = "tours-gallery-shade";

            const title = document.createElement("h3");
            title.textContent = destination.name;

            link.append(img, shade, title);
            card.appendChild(link);

            gallery.appendChild(card);
        }

        if (loadMoreButton && gallery) {

            loadMoreButton.addEventListener("click", function () {

                if (extraIndex >= extraDestinations.length) {
                    loadMoreButton.hidden = true;
                    return;
                }

                const destination =
                    extraDestinations[extraIndex];

                addDestination(destination);

                extraIndex++;

                if (extraIndex >= extraDestinations.length) {
                    loadMoreButton.hidden = true;
                }

                filterTours();
            });
        }

        if (showAllButton) {

            showAllButton.addEventListener("click", function () {

                toursForm.reset();

                getAllTourCards().forEach(function (card) {
                    card.hidden = false;
                });

                searchMessage.textContent = "";
                noResults.hidden = true;
                showAllButton.hidden = true;

                if (loadMoreButton) {
                    loadMoreButton.hidden =
                        extraIndex >= extraDestinations.length;
                }
            });
        }
    }

    /* NEWSLETTER FORM */

    const newsletterForm =
        document.getElementById("toursNewsletterForm");

    if (newsletterForm) {

        const emailInput =
            document.getElementById("toursNewsletterEmail");

        const newsletterMessage =
            document.getElementById("toursNewsletterMessage");

        newsletterForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!emailInput.checkValidity()) {
                emailInput.reportValidity();
                return;
            }

            newsletterMessage.textContent =
                "Thank you for subscribing! Connect an email service to receive subscriptions.";

            emailInput.value = "";
        });
    }

    /* AUTOMATIC COPYRIGHT YEAR */

    const yearElement =
        document.getElementById("toursCopyrightYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});