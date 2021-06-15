cube(`StudentApplicationProgramContentprofilecourseStartdates`, {
  sql: `SELECT * FROM backenddb.\`student_application_program_contentProfileCourse_startDates\``,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [
        programContentprofilecourseStartdatesMonth,
        programContentprofilecourseStartdatesYear,
      ],
    },
  },

  dimensions: {
    programContentprofilecourseStartdatesMonth: {
      sql: `${CUBE}.\`program.contentProfileCourse.startDates.month\``,
      type: `string`,
      title: `Program.contentprofilecourse.startdates.month`,
    },

    programContentprofilecourseStartdatesYear: {
      sql: `${CUBE}.\`program.contentProfileCourse.startDates.year\``,
      type: `string`,
      title: `Program.contentprofilecourse.startdates.year`,
    },
  },

  dataSource: `default`,
});
