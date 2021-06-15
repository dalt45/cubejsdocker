cube(`UniversityCampusFieldsLandingsContentprofilecourseStartdates`, {
  sql: `SELECT * FROM backenddb.\`university_campus_fields_landings_contentProfileCourse_startDates\``,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [
        campusFieldsLandingsContentprofilecourseStartdatesMonth,
        campusFieldsLandingsContentprofilecourseStartdatesYear,
      ],
    },
  },

  dimensions: {
    campusFieldsLandingsContentprofilecourseStartdatesMonth: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.startDates.month\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.startdates.month`,
    },

    campusFieldsLandingsContentprofilecourseStartdatesYear: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.startDates.year\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.startdates.year`,
    },
  },

  dataSource: `default`,
});
