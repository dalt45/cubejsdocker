cube(`StudentApplicationCertificates`, {
  sql: `SELECT * FROM backenddb.student_application_certificates`,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [certificatesTestname],
    },
  },

  dimensions: {
    certificatesTestname: {
      sql: `${CUBE}.\`certificates.testName\``,
      type: `string`,
      title: `Certificates.testname`,
    },

    certificatesTestscore: {
      sql: `${CUBE}.\`certificates.testScore\``,
      type: `string`,
      title: `Certificates.testscore`,
    },
  },

  dataSource: `default`,
});
