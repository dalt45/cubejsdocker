cube(`University`, {
  sql: `SELECT * FROM mongodb.university`,
  joins: {
    UniversityLandings: {
      relationship: `hasMany`,
      sql: `${University}._id = ${UniversityLandings}._id`,
    },
  },
  measures: {
    count: {
      type: `count`,
      drillMembers: [createdby, name],
    },
  },

  dimensions: {
    id: {
      sql: `${CUBE}.\`_id\``,
      type: `string`,
      primaryKey: true,
      shown: true,
    },
    createdby: {
      sql: `${CUBE}.\`createdBy\``,
      type: `string`,
    },

    name: {
      sql: `name`,
      type: `string`,
    },
  },

  dataSource: `default`,
});
