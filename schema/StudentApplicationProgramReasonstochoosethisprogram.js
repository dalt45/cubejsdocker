cube(`StudentApplicationProgramReasonstochoosethisprogram`, {
  sql: `SELECT * FROM mongodb.\`student_application_program_reasonsToChooseThisProgram\``,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [],
    },
  },

  dimensions: {
    programReasonstochoosethisprogramReason: {
      sql: `${CUBE}.\`program.reasonsToChooseThisProgram.reason\``,
      type: `string`,
      title: `Program.reasonstochoosethisprogram.reason`,
    },
  },

  dataSource: `default`,
});
