/*
  Web Help Desk Keyboard Short Cuts
  RegEx to match keybinds: /(?<=\/\/ )(ALT|ENTER|CTRL|Left|Right)[^\n]+/gim
  Log Keypress:
    document.addEventListener("keydown", (e) => console.log(e.key))
*/

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
  return Boolean(
    document.querySelector(
      "#ClientPartUpdateContainerDiv > div:nth-child(1) > div > form > div.sectionDividerNoTopMargin > div"
    )
  );
}

function isTicketTab() {
  return Boolean(
    document.querySelector(
      "#DatesPanelDiv > table > tbody > tr:nth-child(1) > td:nth-child(1)"
    )
  );
}

function getRequestDetail() {
  return document.getElementById("requestDetail").value;
}

function getSubject() {
  return document.getElementById("subject").value;
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

function selectRequestTypeOrQuickTicketOrBulkSelection() {
  let selects = [
    ...(document.getElementById("ticketRequestTypeObserverDiv")?.childNodes ||
      []),
  ].filter((t) => t.tagName === "SELECT");

  // selects request type
  if (selects?.length) {
    if (selects.at(-1).value === "WONoSelectionString") {
      // select latest if it is not filled out
      selects.at(-1).focus();
    } else {
      // select first
      selects[0].focus();
    }
  } else {
    // focus on quick ticket/bulk action
    document.querySelector("#bulkActionSelection").focus();
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
  let element = document.querySelector("[title='Show Previous']");
  if (element) element.click();

  if (document.activeElement.type == "radio") {
    let buttons = [
      ...document.querySelectorAll(`[name='${document.activeElement.name}']`),
    ];

    let index = buttons.findIndex((f) => f.checked);
    if (index == -1) {
      index = 0;
      buttons[index].checked = true;
      return;
    }

    index = index - 1;
    if (index < 0) index = buttons.length - 1;
    buttons[index].checked = true;
  }
}

function pageRight() {
  let element = document.querySelector("[title='Show Next']");
  if (element) element.click();

  if (document.activeElement.type == "radio") {
    let buttons = [
      ...document.querySelectorAll(`[name='${document.activeElement.name}']`),
    ];

    let index = buttons.findIndex((f) => f.checked) || 0;
    if (index == -1) {
      index = 1;
      buttons[index].checked = true;
      return;
    }

    index = index + 1;
    if (index == buttons.length) index = 0;
    buttons[index].checked = true;
  }
}

function clientTabOrder() {
  let activeElement = document.activeElement;
  let elements = [];
  let element = elements.find(
    ({ element, emptyValue, value }) => value == emptyValue
  );
  // there is an error if element not found but it is good cause then it doesnt prevent default
  if (element) {
    element.element.focus();
    return false;
  }
  return true;
}

function assetTabOrder() {
  let activeElement = document.activeElement;
  let elements = [];
  let element = elements.find(
    ({ element, emptyValue, value }) => value == emptyValue
  );
  // there is an error if element not found but it is good cause then it doesnt prevent default
  if (element) {
    element.element.focus();
    return false;
  }
  return true;
}

function ticketTabOrder() {
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
  // there is an error if element not found but it is good cause then it doesnt prevent default
  if (element) {
    element.element.focus();
    return false;
  }

  return true;
}

function defaultMessage() {
  let note = document.getElementById("noteText");

  if (note.value === "!") {
    const defaultMessage =
      "Hello,\n\nThank you for contacting Biola's IT Helpdesk.\n";
    // insert default message
    note.value = defaultMessage;
    // mark visible
    document.querySelector(
      "#TechNoteEditorUpdateContainer > table > tbody > tr:nth-child(1) > td.dataTop > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr > td:nth-child(1) > input[type=checkbox]"
    ).checked = true;
  }
}

async function fillClientTab() {
  // clear fields
  document.querySelector("input[name='emailField']").value = "";
  document.querySelector(
    "#ClientPartUpdateContainerDiv > div:nth-child(1) > div > form > div.ticketSection > table > tbody > tr:nth-child(1) > td:nth-child(2) > input[type=text]"
  ).value = "";
  document.querySelector("input[name='lastNameField']").value = "";

  // read clipboard
  let text = "";
  try {
    text = await readClipboard(); //(await navigator.clipboard.readText()).replace(/\r/gim, "");
  } catch {}
  // console.log({ text });

  let firstName = text.match(/(?<=^From: )\S+/gim)?.[0];
  let lastName = text.match(/(?<=^From: \S+ )\S+/gim)?.[0];
  // let lastName = text.match(/(?<=^From: [^<]+ )[^<]+(?=<)/gim)?.[0];
  let email = text.match(/(?<=^From:[^\<]+\<)[^\>]+/gim)?.[0];
  if (!email) email = text.match(/[A-z\.\-\_0-9]+\@biola\.edu/gim)?.[0];
  let isBiolaEmail = email?.match(/biola\.edu/gim);
  // formstack
  if (email === "no-reply@biola.edu") {
    firstName = text.match(/(?<=^Name:\s+)\S+/gim)?.[0];
    lastName = text.match(/(?<=^Name:\s+\S+ )\S+/gim)?.[0];
    email = text.match(/(?<=^Email:\s+)\S+/gim)?.[0];
  }

  if (isBiolaEmail) {
    document.querySelector("input[name='emailField']").value = email || "";
  } else {
    if (firstName === "OnceHub" && lastName === "Mailer") {
      firstName = text.match(/(?<=^Customer name\n)\S+/gm)[0];
      lastName = text.match(/(?<=^Customer name\n(\S+ )+)\S+$/gm)[0];
    }
    // idk why no name field :(
    document.querySelector(
      "#ClientPartUpdateContainerDiv > div:nth-child(1) > div > form > div.ticketSection > table > tbody > tr:nth-child(1) > td:nth-child(2) > input[type=text]"
    ).value = firstName || "";
    document.querySelector("input[name='lastNameField']").value =
      lastName || "";
  }

  // click search button
  if (!firstName && !lastName && !email) {
    // alert("No client data found in clipboard!");
  } else {
    document
      .querySelector(
        "#ClientPartUpdateContainerDiv > div:nth-child(1) > div > form > div.ticketSection > table > tbody > tr:nth-child(7) > td > div.buttonsRight > div:nth-child(2) > a:nth-child(3)"
      )
      .click();
  }
}
async function fillAssetTab() {
  let text = await readClipboard(); //(await navigator.clipboard.readText()).replace(/\r/gim, "");
}
async function fillTicketTab() {
  let text = await readClipboard(); //(await navigator.clipboard.readText()).replace(/\r/gim, "");
  // console.log({text});

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
  // subject line
  document.getElementById("subject").value = text
    ?.match(/(?<=Subject: ).*/)[0]
    ?.replace(/ \w/gim, (m) => ` ${m.toUpperCase()}`)
    ?.replace(/^./gim, (m) => m.toUpperCase())
    ?.replace(/\s+/g, " ");

  // request detail
  pasteAndFormatIntoElement(document.getElementById("requestDetail"), text);

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

async function pasteAndFormatIntoElement(element, text) {
  // text = text.toString()
  // console.log(text);
  text = text.replace(/\r/gim, "");
  // text = text.replace(/^\n*---------- Forwarded message ---------\n/g, "");
  // let newMessageThing = "\\n+— Biola's IT Helpdesk Staff\\n\\nWondering how to sort through your Google Drive? Navigate to this link to see what files are taking up the most space in your Drive: https://drive.google.com/drive/quota\\n+"
  // text = text.replace(new RegExp(newMessageThing, "g"), "")

  text = text.replace(
    /\n+— Biola's IT Helpdesk Staff\n+Wondering how to sort through your Google Drive\? Navigate to this link to see what files are taking up the most space in your Drive: https:\/\/drive.google.com\/drive\/quota\n+/,
    ""
  );
  text = text.replace(
    /\n+— Biola's IT Helpdesk Staff\s+Wondering how to sort through your Google Drive\? Navigate to this link to see what files are taking up the most space in your Drive:\s+https:\/\/drive.google.com\/drive\/quota\s+/g,
    ""
  );
  // console.log(text);

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
}

async function saveClipboard() {
  return new Promise((resolve) => {
    // Read the text from the clipboard
    navigator.clipboard
      .readText()
      .then((text) => {
        text = text.replace(/\r/gim, "");
        // Save the text to chrome.storage
        chrome.storage.local.set({ cb: text }, function () {
          // console.log("Clipboard saved");
          resolve();
        });
      })
      .catch((err) => {
        console.error("Failed to read clipboard: ", err);
        resolve();
      });
  });
}

async function readClipboard() {
  return await read("cb");
}

async function read(key) {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], function (result) {
      // console.log("Value retrieved:", result[key]);
      resolve(result[key]);
    });
  });
}

const msg = window.location.href.match(/(?<=msg\=)[^\&]+/gim);
const leftMotions = ["ArrowLeft", "j", "b", "h"];
const rightMotions = ["ArrowRight", "w", "e", "k", "l"];
var clientType = {};

document.addEventListener("keydown", async function (event) {
  event.key = event.key.toLowerCase();
  await saveClipboard();
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
      // await sleep(2000);
      // console.log("i run");
      // fillClientTab();
    } else {
      closeOrOpenTechNote();
    }
  }
  // ENTER (!)
  else if (!event.ctrlKey && event.key === "Enter") {
    defaultMessage();
    preventDefault = false;
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
    event.preventDefault();
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
  // ALT + R expands request type select menu or focuses on quick ticket/bulk action
  else if (event.altKey && event.key === "r") {
    selectRequestTypeOrQuickTicketOrBulkSelection();
  }
  // TAB goes to next request subtype
  else if (event.shiftKey === false && event.key === "Tab") {
    let keepDefault = false;
    if (isClientTab()) keepDefault = clientTabOrder();
    else if (isAssetTab()) keepDefault = assetTabOrder();
    else if (isTicketTab()) keepDefault = ticketTabOrder();
    else keepDefault = true;
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
  else if (leftMotions.includes(event.key)) {
    pageLeft();
    preventDefault = false;
  }
  // Right Arrow Key or K goes right one page (Ex: go through a client's tickets on the client page)
  else if (rightMotions.includes(event.key)) {
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
  let text = await readClipboard(); //await navigator.clipboard.readText();
  // text = text.toString()
  // console.log(text);
  text = text.replace(/\r/gim, "");
  // text = text.replace(/^\n*---------- Forwarded message ---------\n/g, "");
  // let newMessageThing = "\\n+— Biola's IT Helpdesk Staff\\n\\nWondering how to sort through your Google Drive? Navigate to this link to see what files are taking up the most space in your Drive: https://drive.google.com/drive/quota\\n+"
  // text = text.replace(new RegExp(newMessageThing, "g"), "")

  text = text.replace(
    /\n+— Biola's IT Helpdesk Staff\n+Wondering how to sort through your Google Drive\? Navigate to this link to see what files are taking up the most space in your Drive: https:\/\/drive.google.com\/drive\/quota\n+/,
    ""
  );
  text = text.replace(
    /\n+— Biola's IT Helpdesk Staff\s+Wondering how to sort through your Google Drive\? Navigate to this link to see what files are taking up the most space in your Drive:\s+https:\/\/drive.google.com\/drive\/quota\s+/g,
    ""
  );
  // console.log(text);

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

window.addEventListener("load", function () {
  console.log("[load]");
  if (isClientTab()) {
    fillClientTab();
  } else if (isTicketTab()) {
    let requestDetail = getRequestDetail();
    let subject = getSubject();
    if (requestDetail.length === 0 && subject.length === 0) {
      fillTicketTab();
    }
  }
});

async function onPageEdit() {
  console.log("Paged edited!");
}

// thanks chatgpt
const targetNode = document.documentElement;
const config = { attributes: true, childList: true, subtree: true };
let timeoutId;

const callback = function(mutationsList, observer) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    onPageEdit();
  }, 100);
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
