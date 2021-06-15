cube(`StudentApplicationArraycertificates`, {
  sql: `SELECT * FROM backenddb.\`student_application_arrayCertificates\``,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [],
    },
  },

  dimensions: {
    arraycertificates: {
      sql: `${CUBE}.\`arrayCertificates\``,
      type: `string`,
    },
  },

  dataSource: `default`,
});
