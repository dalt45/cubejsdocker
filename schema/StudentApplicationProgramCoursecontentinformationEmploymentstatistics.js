cube(`StudentApplicationProgramCoursecontentinformationEmploymentstatistics`, {
  sql: `SELECT * FROM mongodb.\`student_application_program_courseContentInformation_employmentStatistics\``,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [],
    },
  },

  dimensions: {
    programCoursecontentinformationEmploymentstatisticsPercentage: {
      sql: `${CUBE}.\`program.courseContentInformation.employmentStatistics.percentage\``,
      type: `string`,
      title: `Program.coursecontentinformation.employmentstatistics.percentage`,
    },

    programCoursecontentinformationEmploymentstatisticsText: {
      sql: `${CUBE}.\`program.courseContentInformation.employmentStatistics.text\``,
      type: `string`,
      title: `Program.coursecontentinformation.employmentstatistics.text`,
    },
  },

  dataSource: `default`,
});
