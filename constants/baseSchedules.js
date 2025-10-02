export const baseSchedules = {
  // =========================
  // Route 01: Colombo ↔ Kandy
  // =========================
  "01A": [ // Colombo → Kandy
    //morning
    { departure: "04:00", arrival: "06:05" },//bus 1
    { departure: "05:00", arrival: "07:05" },//bus 2
    { departure: "06:00", arrival: "08:05" },//bus 3
    //evening
    { departure: "12:00", arrival: "14:05" },
    { departure: "15:00", arrival: "17:05" },
    { departure: "17:00", arrival: "19:05" },
  ],
  "01B": [ // Kandy → Colombo
    //morning
    { departure: "05:30", arrival: "07:35" },//bus 4
    { departure: "06:30", arrival: "08:35" },//bus 5
    { departure: "07:30", arrival: "09:35" },//bus 6
    //evening
    { departure: "14:30", arrival: "16:35" },
    { departure: "16:00", arrival: "18:05" },
    { departure: "18:00", arrival: "20:05" },

  ],

  // =========================
  // Route 02: Colombo ↔ Ambalangoda
  // =========================
  "02A": [ // Colombo → Ambalangoda
    //morning
    { departure: "04:30", arrival: "06:35" },
    { departure: "05:30", arrival: "07:35" },
    { departure: "06:30", arrival: "08:35" },
    //evening
    { departure: "12:30", arrival: "14:35" },
    { departure: "15:00", arrival: "17:05" },
    { departure: "17:00", arrival: "19:05" },
  ],
  "02B": [ // Ambalangoda → Colombo
    //morning
    { departure: "05:00", arrival: "07:05" },
    { departure: "06:00", arrival: "08:05" },
    { departure: "07:00", arrival: "09:05" },
    //evening
    { departure: "13:00", arrival: "15:05" },
    { departure: "15:30", arrival: "17:35" },
    { departure: "17:30", arrival: "19:35" },
  ],

  // =========================
  // Route 05: Colombo ↔ Kurunegala
  // =========================
  "05A": [ // Colombo → Kurunegala
    //morning
    { departure: "05:00", arrival: "07:00" },
    { departure: "06:00", arrival: "08:00" },
    { departure: "07:00", arrival: "09:00" },
    //evening
    { departure: "13:00", arrival: "15:00" },
    { departure: "15:00", arrival: "17:00" },
    { departure: "17:00", arrival: "19:00" },
  ],
  "05B": [ // Kurunegala → Colombo
    //morning
    { departure: "05:30", arrival: "07:30" },
    { departure: "06:30", arrival: "08:30" },
    { departure: "07:30", arrival: "09:30" },
    //evening
    { departure: "13:30", arrival: "15:30" },
    { departure: "15:30", arrival: "17:30" },
    { departure: "17:30", arrival: "19:30" },
  ],

  // =========================
  // Route 22: Kandy ↔ Ampara
  // =========================
  "22A": [ // Kandy → Ampara
    //morning
    { departure: "04:00", arrival: "08:00" },
    { departure: "06:00", arrival: "10:00" },
    { departure: "08:00", arrival: "12:00" },
    //evening
    { departure: "16:00", arrival: "20:00" },
    { departure: "18:00", arrival: "22:00" },
    { departure: "20:00", arrival: "00:00" },
  ],
  "22B": [ // Ampara → Kandy
    //morning
    { departure: "04:30", arrival: "08:30" },
    { departure: "06:30", arrival: "10:30" },
    { departure: "08:30", arrival: "12:30" },
    //evening
    { departure: "16:30", arrival: "20:30" },
    { departure: "19:30", arrival: "23:30" },
    { departure: "21:30", arrival: "01:30" },
  ],

  // =========================
  // Route 43: Kandy ↔ Anuradhapura
  // =========================
  "43A": [ // Kandy → Anuradhapura
    //morning
    { departure: "05:00", arrival: "08:00" },
    { departure: "06:30", arrival: "09:30" },
    { departure: "08:00", arrival: "11:00" },
    //evening
    { departure: "15:00", arrival: "18:00" },
    { departure: "17:00", arrival: "20:00" },
    { departure: "19:00", arrival: "22:00" },
    { departure: "21:00", arrival: "00:00" }
  ],
  "43B": [ // Anuradhapura → Kandy
    //morning
    { departure: "06:00", arrival: "09:00" },
    { departure: "07:30", arrival: "10:30" },
    { departure: "09:00", arrival: "12:00" },
    //evening
    { departure: "16:00", arrival: "19:00" },
    { departure: "18:00", arrival: "21:00" },
    { departure: "20:00", arrival: "23:00" },
  ]
};

