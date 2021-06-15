cube(`UniversityCampusFieldsLandings`, {
  sql: `SELECT * FROM backenddb.university_campus_fields_landings`,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [
        campusFieldsLandingsId,
        campusFieldsLandingsContentprofilecourseName,
        campusFieldsLandingsCreatedby,
      ],
    },
  },

  dimensions: {
    campusFieldsLandingsId: {
      sql: `${CUBE}.\`campus.fields.landings._id\``,
      type: `string`,
      title: `Campus.fields.landings. Id`,
    },

    campusFieldsLandingsContentprofilecourseBriefaboutcourse: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.briefAboutCourse\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.briefaboutcourse`,
    },

    campusFieldsLandingsContentprofilecourseCoursecontent: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.courseContent\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.coursecontent`,
    },

    campusFieldsLandingsContentprofilecourseCoursetype: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.courseType\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.coursetype`,
    },

    campusFieldsLandingsContentprofilecourseDuration: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.duration\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.duration`,
    },

    campusFieldsLandingsContentprofilecourseDurationunit: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.durationUnit\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.durationunit`,
    },

    campusFieldsLandingsContentprofilecourseEmploymentstatisticsFourmonths: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.employmentStatistics.fourMonths\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.employmentstatistics.fourmonths`,
    },

    campusFieldsLandingsContentprofilecourseEmploymentstatisticsInternationalprojects: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.employmentStatistics.internationalProjects\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.employmentstatistics.internationalprojects`,
    },

    campusFieldsLandingsContentprofilecourseEmploymentstatisticsPercentiles1: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.employmentStatistics.percentiles.1\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.employmentstatistics.percentiles.1`,
    },

    campusFieldsLandingsContentprofilecourseEmploymentstatisticsPercentiles2: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.employmentStatistics.percentiles.2\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.employmentstatistics.percentiles.2`,
    },

    campusFieldsLandingsContentprofilecourseEmploymentstatisticsPercentiles3: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.employmentStatistics.percentiles.3\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.employmentstatistics.percentiles.3`,
    },

    campusFieldsLandingsContentprofilecourseName: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.name\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.name`,
    },

    campusFieldsLandingsContentprofilecourseOtherrequirements: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.otherRequirements\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.otherrequirements`,
    },

    campusFieldsLandingsContentprofilecourseParagraphcourse: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.paragraphCourse\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.paragraphcourse`,
    },

    campusFieldsLandingsContentprofilecourseParagraphwhystudy: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.paragraphWhyStudy\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.paragraphwhystudy`,
    },

    campusFieldsLandingsContentprofilecoursePricesAverageyearcost: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.prices.averageYearCost\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.prices.averageyearcost`,
    },

    campusFieldsLandingsContentprofilecoursePricesBeintcost: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.prices.beIntCost\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.prices.beintcost`,
    },

    campusFieldsLandingsContentprofilecoursePricesMonthlyaccomodation: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.prices.monthlyAccomodation\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.prices.monthlyaccomodation`,
    },

    campusFieldsLandingsContentprofilecoursePricesTotaltuitioncost: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.prices.totalTuitionCost\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.prices.totaltuitioncost`,
    },

    campusFieldsLandingsContentprofilecourseRequirementsGmt: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.requirements.GMT\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.requirements.gmt`,
    },

    campusFieldsLandingsContentprofilecourseRequirementsIelts: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.requirements.IELTS\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.requirements.ielts`,
    },

    campusFieldsLandingsContentprofilecourseRequirementsToefl: {
      sql: `${CUBE}.\`campus.fields.landings.contentProfileCourse.requirements.TOEFL\``,
      type: `string`,
      title: `Campus.fields.landings.contentprofilecourse.requirements.toefl`,
    },

    campusFieldsLandingsCreatedby: {
      sql: `${CUBE}.\`campus.fields.landings.createdBy\``,
      type: `string`,
      title: `Campus.fields.landings.createdby`,
    },
  },

  dataSource: `default`,
});
