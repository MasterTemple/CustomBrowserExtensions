document.addEventListener("keydown", function (event) {
  // ALT + A displays the class average
  if (event.altKey && event.key === "a") {
      // open all assignment details
      [
        ...document.querySelectorAll(".grade_details.assignment_graded"),
      ].forEach((e) => e.setAttribute("style", "display: table-row;"));

      // get all scores
      var scores = [
        ...document.querySelectorAll(".student_assignment.assignment_graded"),
      ]
        .map((assignment) => {
          let averageData =
            assignment.nextElementSibling.nextElementSibling.innerText.match(
              /(?<=Mean: )[\d\.]+/gm
            );
          let possibleData = assignment
            .querySelector(".points_possible")
            .textContent.match(/[\d\.]+/gm);
          if (averageData) {
            return {
              average: parseFloat(averageData[0]),
              possible: parseFloat(possibleData[0]),
              type: assignment.querySelector(".title > .context").textContent,
            };
          }
        })
        .filter((e) => e !== undefined);

      // get assignment types
      var assignments = {};
      [
        ...document.querySelectorAll(
          "#assignments-not-weighted > div:nth-child(1) > table > tbody > tr"
        ),
      ].forEach((element) => {
        assignments[element.querySelector("th").textContent] = {
          weight: parseFloat(
            element.querySelector("td").textContent.match(/[\d\.]+/gm)[0]
          ),
          average: 0,
          possible: 0,
        };
      });

      // there is no weight
      if (Object.keys(assignments).length == 0) {
        assignments = {
          Assignments: {
            weight: 100,
            average: 0,
            possible: 0,
          },
        };
      }

      // removes "Total" category
      delete assignments["Total"];

      // calculate average for asssignment types
      for (let score of scores) {
        assignments[score.type].average += score.average;
        assignments[score.type].possible += score.possible;
      }

      // calculate average final grade
      var totalGrade = 0;
      var ungradedTopics = 100;
      Object.values(assignments).forEach(({ average, possible, weight }) => {
        if (possible == 0) {
          ungradedTopics -= weight;
        } else {
          totalGrade += (average / possible) * weight;
        }
      });
      totalGrade *= 100 / ungradedTopics;

      // hide assignment details
      [
        ...document.querySelectorAll(".grade_details.assignment_graded"),
      ].forEach((e) => e.setAttribute("style", "display: none;"));

      // display average grade
      if(totalGrade.toString() == "NaN") {
        alert(`Instructor settings do not allow me to calculate the average grade. :(`);
      } else {
        alert(`The average grade is ${totalGrade}.`);
      }
  }
});
