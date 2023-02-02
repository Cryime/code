window.addEventListener("load", async () => {
  try {
    const res = await axios({
      url: "/dashboard",
      // headers: { Authorization: localStorage.getItem("token") },
    });
    console.log(res);
    const year = res.data.year;
    const sheet = echarts.init(document.getElementById("line"));
    const sheet1 = echarts.init(document.getElementById("lines"));
    console.log(year);
    const option = {
      title: {
        text: "2022全学科薪资走势",
        left: "2%",
        top: "2%",
      },
      xAxis: {
        type: "category",
        data: year.map((item) => item.year),
        axisLine: {
          lineStyle: {
            color: "#999",
            type: "dashed",
          },
        },
      },
      yAxis: {
        type: "value",
        splitLine: {
          lineStyle: {
            type: "dashed",
          },
        },
      },
      tooltip: {
        trigger: "axis",
      },
      // grid: {
      //   left: "15%",
      //   top: "15%",
      //   right: "15%",
      //   bottom: "15%",
      // },
      series: [
        {
          data: year.map((item) => item.salary),
          type: "line",
          smooth: true,
          symbolSize: "10",
          lineStyle: {
            width: 5,
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#92c6ff", // 0% 处的颜色
                },
                {
                  offset: 0.6,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      color: ["#62afff"],
    };
    sheet.setOption(option);
    const homi = res.data.groupData;
    console.log(homi[1]);
    const option1 = {
      xAxis: {
        type: "category",
        data: homi[1].map((item) => item.name),
        axisLine: {
          lineStyle: {
            color: "#999",
            type: "dashed",
          },
        },
      },
      yAxis: {
        type: "value",
        splitLine: {
          lineStyle: {
            type: "dashed",
          },
        },
      },
      series: [
        {
          data: homi[1].map((item) => item.hope_salary),
          type: "bar",
        },
        {
          data: homi[1].map((item) => item.hope_salary),
          type: "bar",
        },
      ],
      color: [
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#30d6a7", // 0% 处的颜色
            },
            {
              offset: 0.6,
              color: "#bbf0e1", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#92c6ff", // 0% 处的颜色
            },
            {
              offset: 0.6,
              color: "#bbf0e1", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      ],
    };
    sheet1.setOption(option1);

    const btn = document.querySelector("#btns");
    btn.addEventListener("click", function (e) {
      console.log(e.target.tagName);
      if (e.target.tagName === "BUTTON") {
        document.querySelector("#btns .btn-blue").classList.remove("btn-blue");
        e.target.classList.add("btn-blue");
        const index = e.target.innerHTML.trim();
        option1.xAxis.data = homi[index].map((item) => item.name);
        option1.series[0].data = homi[index].map((item) => item.hope_salary);
        option1.series[1].data = homi[index].map((item) => item.hope_salary);
        sheet1.setOption(option1);
      }
    });

    const data = res.data.overview;
    for (const k in data) {
      document.querySelector(`[name="${k}"]`).innerHTML = data[k];
    }
  } catch (err) {
    console.log(err);
  }
});
