import store from "@/store";
import { SurveyModel } from "survey-vue";
import surveyJSON from "@/survey-enfr.json";

describe("store.ts", () => {
  it("calcScore getter is properly calculated if data is defined", () => {
    store.state.result = new SurveyModel(surveyJSON);

    const result = new SurveyModel(surveyJSON);

    result.data = {
      projectDetailsRespondent: "name",
      projectDetailsJob: "position",
      "projectDetailsDepartment-NS": "item061",
      projectDetailsBranch: "test",
      projectDetailsTitle: "project",
      projectDetailsPhase: "item1",
      projectDetailsDescription: "desc",
      decisionSector1: ["item1-1", "item2-1", "item3-1"]
    };

    store.commit("updateResult", result);

    const calcScore = store.getters.calcScore;

    expect(calcScore).toEqual([3, 0, 3, 1]);
  });

  it("calcScore is properly calculated if data is undefined", () => {
    store.state.result = undefined;
    const getter = store.getters.calcScore;

    expect(getter).toEqual([0, 0, 0]);
  });

  it("tooldata getter calculated properly, if state is defined", () => {
    store.state.result = new SurveyModel(surveyJSON);

    const result = new SurveyModel(surveyJSON);

    result.data = {
      projectDetailsRespondent: "name",
      projectDetailsJob: "position",
      "projectDetailsDepartment-NS": "item061",
      projectDetailsBranch: "test",
      projectDetailsTitle: "project",
      projectDetailsPhase: "item1",
      projectDetailsDescription: "desc",
      decisionSector1: ["item1-1", "item2-1", "item3-1"]
    };

    store.commit("updateResult", result);

    const toolDataGetter = store.state.toolData;

    expect(toolDataGetter).toEqual(result.data);
  });

  it("there are valid number of results in resultDataSections getter sections", () => {
    store.state.result = new SurveyModel(surveyJSON);

    const result = new SurveyModel(surveyJSON);

    result.data = {
      projectDetailsRespondent: "name",
      projectDetailsJob: "position",
      "projectDetailsDepartment-NS": "item061",
      projectDetailsBranch: "test",
      projectDetailsTitle: "project",
      projectDetailsPhase: "item1",
      projectDetailsDescription: "desc",
      decisionSector1: ["item1-1", "item2-1", "item3-1"],
      impact5: "item1-4",
      dataQualityDesign7: "item1-2"
    };

    store.commit("updateResult", result);

    const resultDataSections = store.getters.resultDataSections;

    expect(resultDataSections[0].length).toEqual(7);
    expect(resultDataSections[1].length).toEqual(2);
    expect(resultDataSections[2].length).toEqual(1);
  });
});

describe("store.ts choiceData", () => {
  it("keeps a non-empty French label when a checkbox choice has the same text in both languages", () => {
    const surveyJSON = {
      pages: [
        {
          name: "page1",
          elements: [
            {
              type: "checkbox",
              name: "q1-RS",
              title: { default: "Question", fr: "Question" },
              choices: [
                {
                  value: "item1",
                  text: { default: "Surveillance", fr: "Surveillance" }
                },
                { value: "item2", text: { default: "Other", fr: "Autre" } }
              ]
            }
          ]
        }
      ]
    };

    const result = new SurveyModel(surveyJSON);
    result.locale = "fr";
    result.data = { "q1-RS": ["item1"] };

    store.commit("updateResult", result);

    const sections = store.getters.resultDataSections;
    const checkboxResult = sections[1].find(
      (item: any) => item.name === "q1-RS"
    );

    expect(checkboxResult).toBeDefined();
    const surveillance = checkboxResult.choiceData.find(
      (choice: any) => choice.en === "Surveillance"
    );
    expect(surveillance.fr).toEqual("Surveillance");
  });
});
