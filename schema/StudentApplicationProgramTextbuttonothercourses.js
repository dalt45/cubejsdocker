cube(`StudentApplicationProgramTextbuttonothercourses`, {
  sql: `SELECT * FROM mongodb.\`student_application_program_textButtonOtherCourses\``,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [],
    },
  },

  dimensions: {
    programTextbuttonothercoursesTextcourse: {
      sql: `${CUBE}.\`program.textButtonOtherCourses.textCourse\``,
      type: `string`,
      title: `Program.textbuttonothercourses.textcourse`,
    },
  },

  dataSource: `default`,
});
