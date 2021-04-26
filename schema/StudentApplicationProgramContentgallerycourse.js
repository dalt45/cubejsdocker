cube(`StudentApplicationProgramContentgallerycourse`, {
  sql: `SELECT * FROM mongodb.\`student_application_program_contentGalleryCourse\``,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [],
    },
  },

  dimensions: {
    programContentgallerycourseUrl: {
      sql: `${CUBE}.\`program.contentGalleryCourse.url\``,
      type: `string`,
      title: `Program.contentgallerycourse.url`,
    },
  },

  dataSource: `default`,
});
