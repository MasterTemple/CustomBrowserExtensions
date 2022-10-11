/*
  Web Help Desk Keyboard Short Cuts
  RegEx to match keybinds: /(?<=\/\/ )(ALT|ENTER|CTRL|Left|Right)[^\n]+/gim
  Log Keypress:
    document.addEventListener("keydown", e => console.log(e.key))
  */

function bool(anything) {
  return !!anything;
}
function bold(str) {
  return `[b]${str}[/b]`;
}

function click(path) {
  let element = document.querySelector(path);
  if (element) element.click();
}

function clickAll(path) {
  let elements = document.querySelectorAll(path);
  if (elements) elements.forEach((e) => e.click());
}

function createNewTicket() {
  document
    .querySelector(
      "#TicketListHeaderDiv > table > tbody > tr:nth-child(1) > td > div.buttonsLeft > table > tbody > tr > td:nth-child(1) > a"
    )
    .click();
}

function isDashboardPage() {
  return bool(
    document
      .querySelector(
        "#TicketListHeaderDiv > table > tbody > tr:nth-child(1) > td > div.buttonsLeft > table > tbody"
      )
      ?.innerText?.match(/New Ticket/g)
  );
}

function boldSelection() {
  // request detail
  if (document.activeElement.id === "requestDetail")
    document.querySelector("#RequestUpdateDiv > div:nth-child(2)").click();
  // tech note
  else if (document.activeElement.id === "noteText")
    document
      .querySelector(
        "#TechNoteEditorUpdateContainer > table > tbody > tr:nth-child(1) > td.dataTop > table > tbody > tr:nth-child(1) > td > div:nth-child(1)"
      )
      .click();
}

function isAssetTab() {
  return bool(document.querySelector(".assetsButtonSelected"));
}

function isClientTab() {
  return bool(
    document.querySelector(
      "#ClientPartUpdateContainerDiv > div:nth-child(1) > div > form > div.sectionDividerNoTopMargin > div"
    )
  );
}

function isTicketTab() {
  return bool(
    document.querySelector(
      "#DatesPanelDiv > table > tbody > tr:nth-child(1) > td:nth-child(1)"
    )
  );
}

function clientIsAssigned() {
  const isAssignedAndOnClientPage = bool(
    document.querySelector(
      "#ClientTicketHistoryDiv > table > tbody > tr.smallBtnRow > td > div > table > tbody > tr > td > table > tbody > tr > td:nth-child(3) > a"
    )
  );
  const isAssignedAndOnTicketPage = bool(
    document.querySelector(
      "#DetailsPanelDiv > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td.defaultFont > a > div"
    )
  );
  return isAssignedAndOnClientPage || isAssignedAndOnTicketPage;
}

function goToAssetTab() {
  document
    .querySelector(
      "#TabPanelUpdateContainer > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td:nth-child(2) > div"
    )
    .click();
}

function goToClientTab() {
  document
    .querySelector(
      "#TabPanelUpdateContainer > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td:nth-child(1) > div"
    )
    .click();
}

function goToTicketTab() {
  document
    .querySelector(
      "#TabPanelUpdateContainer > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td:nth-child(3) > div"
    )
    .click();
}

function findAssets(text) {
  let matches = text.match(/A\d{6}/gim);
  if (matches) matches = matches.map((m) => m.toUpperCase());
  else matches = [];
  return matches;
}

function saveTicket() {
  document.querySelector(".aquaMiddleSel").click();
}

function closeOrOpenTechNote() {
  let buttons = [
    ...document.querySelectorAll(
      "#TechNoteEditorUpdateContainer > table > tbody > tr"
    ),
  ].find(({ innerText, textContent }) => innerText.match(/Cancel/g));
  // if buttons exist, the note is open
  if (buttons) {
    // close note
    buttons.querySelector("td > div > a").click();
  } else {
    // create new note
    document
      .querySelector(
        "#NoteListUpdateDiv > table > tbody > tr.header > td.newNoteHeader > a"
      )
      .click();
  }
}

function selectRequestType() {
  let selects = [
    ...document.getElementById("ticketRequestTypeObserverDiv").childNodes,
  ].filter((t) => t.tagName === "SELECT");
  if (selects.at(-1).value === "WONoSelectionString") {
    selects.at(-1).focus();
  } else {
    selects[0].focus();
  }
}

function jumpTickets() {
  let ticketNumber;
  while (!ticketNumber) {
    let input = prompt("Enter a ticket number:");
    ticketNumber = input.match(/(?<=Ticket(\=| ))\d{6}/gim);
    if (!ticketNumber)
      ticketNumber = input.match(
        /(?<=^Ticket Number\nT?(icket(\=| )?)?)\d{6}/gim
      );
    if (!ticketNumber) ticketNumber = input.match(/(?<=^T?(icket ?)?)\d{6}/gim);
  }
  ticketNumber = ticketNumber[0];
  window.location = `https://whd.biola.edu/helpdesk/WebObjects/Helpdesk.woa/wa/TicketActions/view?ticket=${ticketNumber}`;
}

function goToQueue() {
  window.location =
    "https://whd.biola.edu/helpdesk/WebObjects/Helpdesk.woa/wa/TicketActions/view?tab=mine";
}

function formatTechNote() {
  let element = document.getElementById("noteText");
  if (!element) return;
  // bolds + uppercase assets
  element.value = element.value.replace(
    /(?<=[^\]])a\d{6}/gim,
    (m) => `[b]${m.toUpperCase()}[/b]`
  );
  element.value = element.value.replace(/\n\s+\n/gim, "\n\n");

  // bolds urls but unnecessary
  // element.value = element.value.replace(
  //   /(?<=[^\]][^ ])https?:\/\/\S+/gim,
  //   (m) => `[b] ${m} [/b]`
  // );
  // // quote an email
  // if (element.value.match(/^From:/g))
  //   element.value = `[quote]${element.value}[/quote]`;
  // // bold subject line
  // if (element.value.match(/(?<=^Subject:).*/gim))
  //   element.value = element.value.replace(
  //     /(?<=^Subject:).*/gim,
  //     bold
  //   );

  // mark visible to client if email
  if (element.value.match(/^(\[quote\])?\n*From:/g)) {
    document.querySelector(
      "#TechNoteEditorUpdateContainer > table > tbody > tr:nth-child(1) > td.dataTop > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr > td:nth-child(1) > input[type=checkbox]"
    ).checked = true;
  }
  // find save button
  let buttonSection = [
    ...document.querySelectorAll(
      "#TechNoteEditorUpdateContainer > table > tbody > tr"
    ),
  ].find(({ innerText }) => innerText.match(/Save/g));
  // if note is already open
  if (buttonSection) {
    // close note
    [...buttonSection.querySelectorAll("td > div > a")]
      .find((b) => b.innerText.match(/Save/g))
      .click();
  }
}

function editTechNote() {
  document
    .querySelector(
      "#NoteListUpdateDiv > table > tbody > tr:nth-child(2) > td > a"
    )
    .click();
}

function pageLeft() {
  let possibleElements = [
    // hopefully everything
    document.querySelector("[title='Show Previous']"),
    // // client ticket history
    // document.querySelector(
    //   "#ClientTicketHistoryDiv > table > tbody > tr.smallBtnRow > td > div > table > tbody > tr > td > table > tbody > tr > td:nth-child(3) > a"
    // ),
    // // asset ticket history
    // document.querySelector(
    //   "#ListFooterDiv > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(3) > a"
    // ),
    // // clients assets
    // document.querySelector(
    //   "#ClientAssetsListDiv > table > tbody > tr.panelButtonRow > td > div:nth-child(2) > table > tbody > tr > td:nth-child(3) > a"
    // ),
    // // asset asset history
    // document.querySelector(
    //   "#ListFooterDiv > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(3) > a"
    // ),
  ];

  for (let element of possibleElements) {
    console.log(element);
    if (element) element.click();
  }
}

function pageRight() {
  let possibleElements = [
    // hopefully everything
    document.querySelector("[title='Show Next']"),
    // // client ticket history
    // document.querySelector(
    //   "#ClientTicketHistoryDiv > table > tbody > tr.smallBtnRow > td > div > table > tbody > tr > td > table > tbody > tr > td:nth-child(7) > a"
    // ),
    // // asset ticket history
    // document.querySelector(
    //   "#ListFooterDiv > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(7) > a"
    // ),
    // // clients assets
    // document.querySelector(
    //   "#ClientAssetsListDiv > table > tbody > tr.panelButtonRow > td > div:nth-child(2) > table > tbody > tr > td:nth-child(7) > a"
    // ),
    // // asset asset history
    // document.querySelector(
    //   "#ListFooterDiv > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(7) > a"
    // ),
  ];

  for (let element of possibleElements) {
    console.log(element);
    if (element) element.click();
  }
}

function setTabLocationOld() {
  // these will be the elements to select in order; first one that is empty
  let elements = [];
  // } else if (event.key === "Tab") {

  // dirty method
  /*
        get select element count
        */
  let selects = [
    ...document.getElementById("ticketRequestTypeObserverDiv").childNodes,
  ].filter((t) => t.tagName === "SELECT");
  // length > 1 means I have started filling out request detail
  if (selects.at(-1).value === "WONoSelectionString" && selects.length > 1) {
    // for (let i = 0; i < 4 + selects.length; i++) {
    //   document.dispatchEvent(new KeyboardEvent("keydown", { key: "TAB" }));
    // }
    selects.at(-1).focus();

    // if (event.shiftKey === false)
    // document.dispatchEvent(new KeyboardEvent("keydown", { key: "Space" }));
    // new KeyboardEvent("keydown", { keyCode: 32, which: 32 });
  }
  // deprecated
  // ExpandSelect(
  //   [...document.getElementById("ticketRequestTypeObserverDiv").childNodes]
  //     .filter((t) => t.tagName === "SELECT")
  //     .at(-1)
  // );
}

function setTabLocation() {
  // move onto next one if it is a worthless tab
  let activeElement = document.activeElement;
  let skips = [
    // request detail to client info
    {
      bad: document.querySelector("#requestDetail"),
      next: document.querySelector(
        "#CustomFieldsPanelDiv > table > tbody > tr:nth-child(1) > td.dataStandard > table > tbody > tr > td:nth-child(1) > div > nobr:nth-child(1) > input[type=radio]"
      ),
    },
  ];

  let skip = skips.find(({ bad }) => {
    return bad == activeElement;
  });
  console.log({
    activeElement,
    skip,
  });
  if (skip) {
    skip.next.focus();
    return false;
  }

  // these will be the elements to select in order; first one that is empty
  let selects = [
    ...document.getElementById("ticketRequestTypeObserverDiv").childNodes,
  ]
    .filter((t) => t.tagName === "SELECT")
    .map((element) => {
      return {
        element: element,
        value: element.value,
        emptyValue: "WONoSelectionString",
      };
    });
  let subject = {
    element: document.getElementById("subject"),
    value: document.getElementById("subject").value,
    emptyValue: "",
  };
  let requestDetail = {
    element: document.getElementById("requestDetail"),
    value: document.getElementById("requestDetail").value,
    emptyValue: "",
  };

  let elements = [...selects, subject, requestDetail];
  let element = elements.find(
    ({ element, emptyValue, value }) => value == emptyValue
  );
  // if (element) element.element.focus();
  // there is an error if element not found but it is good cause then it doesnt prevent default
  if (element) {
    element.element.focus();
    return false;
  }

  return true;
}

async function fillClientTab() {
  let text = (await navigator.clipboard.readText()).replace(/\r/gim, "");

  let firstName = text.match(/(?<=^From: )\S+/gim)?.[0];
  let lastName = text.match(/(?<=^From: \S+ )\S+/gim)?.[0];
  // let lastName = text.match(/(?<=^From: [^<]+ )[^<]+(?=<)/gim)?.[0];
  let email = text.match(/(?<=^From:[^\<]+\<)[^\>]+/gim)?.[0];
  let isBiolaEmail = email?.match(/biola\.edu/gim);
  // formstack
  if (email === "no-reply@biola.edu") {
    firstName = text.match(/(?<=^Name:\s+)\S+/gim)?.[0];
    lastName = text.match(/(?<=^Name:\s+\S+ )\S+/gim)?.[0];
    email = text.match(/(?<=^Email:\s+)\S+/gim)?.[0];
  }

  if (isBiolaEmail) {
    document.querySelector("input[name='emailField']").value = email;
  } else {
    if (firstName === "OnceHub" && lastName === "Mailer") {
      firstName = text.match(/(?<=^Customer name\n)\S+/gm)[0];
      lastName = text.match(/(?<=^Customer name\n\S+ )\S+/gm)[0];
    }
    // idk why no name field :(
    document.querySelector(
      "#ClientPartUpdateContainerDiv > div:nth-child(1) > div > form > div.ticketSection > table > tbody > tr:nth-child(1) > td:nth-child(2) > input[type=text]"
    ).value = firstName;
    document.querySelector("input[name='lastNameField']").value = lastName;
  }
  // message = "ticketTab";
  // click search button
  document
    .querySelector(
      "#ClientPartUpdateContainerDiv > div:nth-child(1) > div > form > div.ticketSection > table > tbody > tr:nth-child(7) > td > div.buttonsRight > div:nth-child(2) > a:nth-child(3)"
    )
    .click();
}
async function fillAssetTab() {
  let text = (await navigator.clipboard.readText()).replace(/\r/gim, "");
}
async function fillTicketTab() {
  let text = (await navigator.clipboard.readText()).replace(/\r/gim, "");

  let firstName = text.match(/(?<=^From: )\S+/gim)?.[0];
  let lastName = text.match(/(?<=^From: \S+ )\S+/gim)?.[0];
  // let lastName = text.match(/(?<=^From: [^<]+ )[^<]+(?=<)/gim)?.[0];
  let email = text.match(/(?<=^From:[^\<]+\<)[^\>]+/gim)?.[0];
  let isBiolaEmail = email?.match(/biola\.edu/gim);
  // formstack
  if (email === "no-reply@biola.edu") {
    firstName = text.match(/(?<=^Name:\s+)\S+/gim)?.[0];
    lastName = text.match(/(?<=^Name:\s+\S+ )\S+/gim)?.[0];
    email = text.match(/(?<=^Email:\s+)\S+/gim)?.[0];
  }
  document.getElementById("subject").value = text
    ?.match(/(?<=Subject: ).*/)
    ?.replace(/ \w/gim, (m) => ` ${m.toUpperCase()}`)
    ?.replace(/^./gim, (m) => m.toUpperCase());

  if (isBiolaEmail)
    // sets client info accurate
    document
      .querySelector("input[name='Is client info accurate?'][value='Yes']")
      .click();
  // sets client into to pending
  else
    document
      .querySelector("input[name='Is client info accurate?'][value='Pending']")
      .click();

  // let hasAssets = text.match(/a\d{6}/gim).length > 0
  // if(hasAssets)
  document
    .querySelector("input[name='Is asset info accurate?'][value='Pending']")
    .click();

  // sets impact to low
  [...document.querySelectorAll("#CustomFieldsPanelDiv > table > tbody > tr")]
    .find((f) => f.innerText.match(/Impact of Incident/gim))
    .querySelectorAll(
      "td.dataStandard > table > tbody > tr > td > select > option"
    )
    .forEach((element) => element.removeAttribute("selected"));
  [...document.querySelectorAll("#CustomFieldsPanelDiv > table > tbody > tr")]
    .find((f) => f.innerText.match(/Impact of Incident/gim))
    .querySelector(
      "td.dataStandard > table > tbody > tr > td > select > option:nth-child(2)"
    )
    .setAttribute("selected", "selected");

  // sets urgency to low
  [...document.querySelectorAll("#CustomFieldsPanelDiv > table > tbody > tr")]
    .find((f) => f.innerText.match(/Urgency of Incident/gim))
    .querySelectorAll(
      "td.dataStandard > table > tbody > tr > td > select > option"
    )
    .forEach((element) => element.removeAttribute("selected"));
  [...document.querySelectorAll("#CustomFieldsPanelDiv > table > tbody > tr")]
    .find((f) => f.innerText.match(/Urgency of Incident/gim))
    .querySelector(
      "td.dataStandard > table > tbody > tr > td > select > option:nth-child(2)"
    )
    .setAttribute("selected", "selected");

  // sets contact method to email
  document.querySelector("input[name='Contact Method'][value='Email']").click();

  // sets client type to staff
  document.querySelector("input[name='Client Type'][value='Staff']").click();

  // sets ticket cause to pending
  document.querySelector("input[name='Ticket Cause'][value='Pending']").click();
}

async function createInputs() {
  let assets = prompt("Give assets").match(/A\d{6}/gim);
  document.querySelectorAll("td.button > div > a")[0].click();
  await new Promise((r) => setTimeout(r, 80));
  for (let i = 0; i < assets.length; i++) {
    document.querySelectorAll("td.button > div > a")[1 + !!i].click();
    await new Promise((r) => setTimeout(r, 120));
  }
}

async function fillAssets() {
  let assets = prompt("Give assets").match(/A\d{6}/gim);
  document
    .querySelectorAll("table > tbody > tr > td:nth-child(3) > input[type=text]")
    .forEach((input, index) => (input.value = assets[index]));
}

async function selectResults() {
  clickAll();
  document
    .querySelectorAll(
      "#AssetSearchResultsDiv > div > div > div.ticketSectionNoBorder > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td.rightAlign > a"
    )
    .forEach((e) => e.click());
}

const msg = window.location.href.match(/(?<=msg\=)[^\&]+/gim);
var clientType = {};

document.addEventListener("keydown", async function (event) {
  event.key = event.key.toLowerCase();
  let preventDefault = true;

  // CTRL + SPACE opens a mini terminal
  if (event.ctrlKey && event.key === " ") {
    let cmd = prompt("Enter a command [c(reate), f(ill), s(elect)]");
    if (cmd === "create" || cmd === "c") createInputs();
    else if (cmd === "fill" || cmd === "f") fillAssets();
    else if (cmd === "select" || cmd === "sel" || cmd === "s") selectResults();
  }
  // CTRL + B bolds a highlighted selection
  else if (event.ctrlKey && event.key === "b") {
    boldSelection();
  }
  // ALT + N open new tech note or a new ticket if on ticket queue page
  else if (event.altKey && event.key === "n") {
    if (isDashboardPage()) {
      createNewTicket();
    } else {
      closeOrOpenTechNote();
    }
  }
  // CTRL + ENTER saves a tech note and formats it (bolds assets and marks tech note as visible if it is an email)
  else if (event.ctrlKey && event.key === "Enter") {
    formatTechNote();
  }
  // ALT + A goes to asset tab
  else if (event.altKey && event.key === "a") {
    goToAssetTab();
  }
  // ALT + C goes to client tab
  else if (event.altKey && event.key === "c") {
    goToClientTab();
  }
  // ALT + T goes to ticket tab
  else if (event.altKey && event.key === "t") {
    goToTicketTab();
  }
  // ALT + S saves ticket
  else if ((event.altKey || event.ctrlKey) && event.key === "s") {
    saveTicket();
  }
  // ALT + Q goes to the "My Tickets" page (your ticket queue)
  else if (event.altKey && event.key === "q") {
    goToQueue();
  }
  // ALT + J jumps to a ticket from ticket number; pasting T224397, Ticket 224397, and 224397 work (capitalization does not matter)
  else if (event.altKey && event.key === "j") {
    jumpTickets();
  }
  // ALT + R expands request type select menu
  else if (event.altKey && event.key === "r") {
    selectRequestType();
  }
  // TAB goes to next request subtype
  else if (event.shiftKey === false && event.key === "Tab") {
    let keepDefault = setTabLocation();
    if (keepDefault) preventDefault = false;
  }
  // ALT + F fills out client info from copied email
  else if (event.altKey && event.key === "f") {
    if (isAssetTab()) {
      fillAssetTab();
    } else if (isClientTab()) {
      fillClientTab();
    } else if (isTicketTab()) {
      fillTicketTab();
    }
  }
  // ALT + E edits a Tech Note
  else if (event.altKey && event.key === "e") {
    editTechNote();
  }
  // Left Arrow Key or J goes left one page (Ex: go through a client's tickets on the client page)
  else if (event.key === "ArrowLeft" || event.key === "j") {
    console.log("pageLeft();");
    pageLeft();
    preventDefault = false;
  }
  // Right Arrow Key or K goes right one page (Ex: go through a client's tickets on the client page)
  else if (event.key === "ArrowRight" || event.key === "k") {
    console.log("pageRight();");
    pageRight();
    preventDefault = false;
  } else {
    preventDefault = false;
  }
  if (preventDefault) event.preventDefault();
});

// CTRL + V pasted text is formatted
document.addEventListener("paste", async (event) => {
  let element = event.target;
  let text = await navigator.clipboard.readText();
  text = text.replace(/\r/gim, "");
  // text = text.replace(/^\n*---------- Forwarded message ---------\n/g, "");

  // removes ticket thread
  text = text.replace(
    /On .* Biola IT Helpdesk <it.helpdesk@biola.edu> wrote:[^]+/gim,
    ""
  );

  let quoteCount =
    text.match(/---------- Forwarded message ---------/gim)?.length || 0;
  // FINISH THIS
  quoteCount += text.match(/On .* at .* \<.*\> wrote:/gim)?.length || 0;
  text = text.replace(/On .* at .* \<.*\> wrote:/gim, (m) => `[quote]${m}`);
  // console.log({ text });
  text = text.replace(
    /\n*---------- Forwarded message ---------\n+/gim,
    "[quote]\n"
  );
  // console.log({ text });
  text = text.replace(/(?<=^Subject: .*\[\/?quote)\]/gim, "​]");

  let isEmail = text.match(/^(\[quote\]\n)?From:/g);
  if (isEmail) {
    // just made it multiline
    let isForm = text.match(
      /^(\[quote\]\n)?(From: OnceHub Mailer \<mailer@oncehub.com\>|From: \<no-reply@biola\.edu\>|From: Alumni Relations <alumni.relations@biola.edu>)/gm
    );
    // is formstack form
    if (isForm) {
      // console.log({ isForm });
      let fieldOnNextLine = [
        "To: <it.helpdesk@biola.edu>\n\n\n ",
        "Booking page image",
        "Subject",
        "Technical Support Appointment",
        "Calendar",
        "Your time",
        "Customer time",
        "Location",
        "Booking ID",
        "Customer name",
        "Phone number",
        "Customer's mobile phone",
        "Type of Assistance",
        "What type of computer is being updated?",
        "Best number to reach you",
        "Asset Number",
        "Computer OS Update Time Slot",
        "Ticket Number",
      ];
      let fieldOnSameLineWithColon = [
        "Passcode",
        "Meeting ID",
        "Meeting passcode",
        "Formstack Submission For",
        "Name",
        "Asset Number",
        "What kind of issue are you having\\?",
        "Describe the problem \\(or error message\\)",
        "Your Name",
        "Personal Email Address",
        "Biola Email Address",
        "Phone",
        "Preferred Contact Method",
        "How can we help with your Biola Alumni Google account\\?",
        "What difficulty are you having accessing your account\\?",
        "What method are you using to transfer data out of your account\\?",
        "Please describe:",
        "Please describe your difficulty",
        "Current Legal Name",
        "Is your current legal name different from your name while attending Biola\\?",
        "Name while attending Biola",
        "Current Mailing Address",
        "Birthday",
        "Year you graduated or left Biola",
        "Major at Biola",
        "Biola ID Number",
        "Email",
        "Will this address be used by a department, or by a student group\\?",
        "Preferred Email Address",
        "What department will this account belong to\\?",
        "Who will manage this account\\?",
        "What is the primary use for this account\\?",
        "Preferred Email Address",
        "Preferred Sender Name",
        "What department will this account belong to\\?",
        "Who is the faculty or staff advisor for this student group\\?",
        "What is the primary use for this account\\?",
        "Do you agree to the terms and conditions\\?",
        "Formstack Submission For",
        "Employee's Name",
        "Biola ID Number \\(if known\\)",
        "Effective Starting Date",
        "Banner Fund Number",
        "Banner Organization Number",
        "Department Name",
        "Position Title",
        'Who is this person replacing\\? If this is a new position, write "NEW".',
        "Supervisor Name",
        "Supervisor's Biola ID",
        "Will this person drive Biola vehicles\\?",
        "For HR Use Only",
        "Is this a Regular or Temporary position\\?",
        "Temporary until what date\\?",
        "The standard hours worked per week are:",
        "The number of months worked per year are:",
        "Is this a salaried or hourly position\\?",
        "Starting Hourly Pay:",
        "Submitter's Name",
        "Submitter's Email Address",
        "Email Address of Area Vice President \\(needed for authorization\\)",
        "For Office Use Only",
        "Form Name",
        "Submission Time",
        "Unique ID",
        "Please check here if you would like Biola to update your personal email address in our database:",
        "What topic do you have questions or concerns about\\?",
        "CPU",
        "RAM",
        "Hard Drive",
      ];
      let fieldOnSameLineWithoutColon = [
        "Submitted at",
        "Name",
        "Semester subscription cost",
        "Banner Fund",
        "Banner Org",
      ];
      // maybe i can move the ^ left 1, cause i dont think it makes starting on a new line required for same-line fields
      let fieldMatcher = new RegExp(
        `(?<=(^(${fieldOnNextLine.join(
          "|"
        )})\\n)|((${fieldOnSameLineWithColon.join(
          "|"
        )}):(\\t| )+)|((${fieldOnSameLineWithoutColon.join("|")})(\\t| )+)).*`,
        "gm"
      );
      // console.log(fieldMatcher);
      // bolds next line after the following headers
      // first group is `text + newline` (for field being on next line)
      // second group is `text:` (for field being on same line)
      text = text.replace(
        fieldMatcher,
        // /(?<=(^(To: <it.helpdesk@biola.edu>\n\n\n |Booking page image|Subject|Technical Support Appointment|Calendar|Your time|Customer time|Location|Booking ID|Customer name|Phone number|Customer's mobile phone|Type of Assistance|What type of computer is being updated\?|Best number to reach you|Asset Number|Computer OS Update Time Slot|Ticket Number)\n)|((Passcode|Meeting ID|Meeting passcode|Formstack Submission For|Name|Asset Number|What kind of issue are you having\?|Describe the problem \(or error message\)):(\t| )+)).*/gim,
        bold
      );
    }
    // bold sender
    text = text.replace(/(?<=^From: )[^\<]+/gim, bold);
    text = text.replace(/(?<=^To: )[^\<]+/gim, bold);
    // bold subject line
    text = text.replace(/(?<=^Subject: ).*/gim, bold);
    // bold asset
    element.value = element.value.replace(
      /(?<=[^\]])a\d{6}/gim,
      (m) => `[b]${m.toUpperCase()}[/b]`
    );
    // bold id# from alumni verification
    text = text.replace(/(?<=^ID# )\d+/gim, bold);

    // // removes ticket thread
    // text = text.replace(
    //   /On .* Biola IT Helpdesk <it.helpdesk@biola.edu> wrote:[^]+/gim,
    //   ""
    // );

    // quotes email
    // text = `[quote]${text}[/quote]`;
    for (let i = 0; i < quoteCount; i++) {
      text += "[/quote]";
    }
    text = text.replace(/\n\s+\n/gim, "\n\n");
    text = text.replace(/\s+\[\/quote\]/gim, "[/quote]");
    element.value = text;
    event.preventDefault();
  }
});

/*
window.addEventListener("load", function () {
  // scrape client type

  clientType = {
    affiliationType: [
      ...document.querySelectorAll("div.ticketSection > table > tbody > tr"),
    ]
      .find((f) => f.innerText.includes("Primary Affiliation"))
      .innerText.match(/(?<=\n)[^\t]+/gim)[0],
    employeeType: [
      ...document.querySelectorAll("div.ticketSection > table > tbody > tr"),
    ]
      .find((f) => f.innerText.includes("Employee Type"))
      .innerText.match(/(?<=\n)[^\t]+/gim)[0],
  };

  // console.log(clientType);
  // auto focuses request detail when blank
  let requestDetail = this.document.getElementById("requestDetail");
  if (requestDetail) {
    if (requestDetail?.value?.length === 0) {
      requestDetail.focus();
      return;
    }
  }
  // currently does nothing
  // but exists to chain events that require loading in between
  switch (msg) {
    case "ticketTab":
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "t", altKey: true })
      );
      break;
    default:
    // code block
  }

  // // auto focuses next request type select menu
  // let selects = [
  //   ...document.getElementById("ticketRequestTypeObserverDiv").childNodes,
  // ].filter((t) => t.tagName === "SELECT");
  // if (selects.at(-1).value === "WONoSelectionString") {
  //   selects.at(-1).focus();
  // }

  // i forgot what this was for
  // it is maybe for client type
  msg = "";
});
*/
