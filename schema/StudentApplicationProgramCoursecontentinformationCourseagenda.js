cube(`StudentApplicationProgramCoursecontentinformationCourseagenda`, {
  sql: `SELECT * FROM mongodb.\`student_application_program_courseContentInformation_courseAgenda\``,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [],
    },
  },

  dimensions: {
    programCoursecontentinformationCourseagendaLesson: {
      sql: `${CUBE}.\`program.courseContentInformation.courseAgenda.lesson\``,
      type: `string`,
      title: `Program.coursecontentinformation.courseagenda.lesson`,
    },
  },

  dataSource: `default`,
});
