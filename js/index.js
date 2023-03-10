window.addEventListener("load", async () => {
  try {
    const res = await axios({
      url: "/dashboard",
      // headers: { Authorization: localStorage.getItem("token") },
    });
    // console.log(res);
    const year = res.data.year;
    const sheet = echarts.init(document.getElementById("line"));
    const sheet1 = echarts.init(document.getElementById("lines"));
    const sheet2 = echarts.init(document.getElementById("salary"));
    const sheet3 = echarts.init(document.getElementById("gender"));
    console.log(year);
    const option = {
      title: {
        text: "2022全学科薪资走势",
        left: "2%",
        top: "2%",
      },
      xAxis: {
        type: "category",
        data: year.map((item) => item.month),
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
    const salaryData = res.data.salaryData;
    console.log(salaryData);
    const option2 = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "85%",
        left: "center",
      },
      title: {
        text: "班级薪资分布",
        top: "2%",
        left: "2%",
      },
      series: [
        {
          name: "班级薪资分布",
          type: "pie",
          radius: ["40%", "50%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: salaryData.map((item) => {
            return {
              value: item.b_count + item.g_count,
              name: item.label,
            };
          }),
          // { value: 1000, name: " 苹果" },
          // { value: 300, name: "小米" },
          // { value: 800, name: "华为" },
          // { value: 500, name: " 三星" },
        },
      ],
      color: ["#a0cff2", "tomato", "#e64a67", "#ab7ec4"],
    };
    sheet2.setOption(option2);

    const option3 = {
      title: [
        {
          text: "男女薪资分布",
          left: "2%",
          top: "2%",
        },

        {
          subtext: "女生",
          left: "center",
          top: "90%",
          subtextStyle: {
            fontSize: 16,
            fontWeight: 700,
          },
        },
        {
          subtext: "男生",
          left: "center",
          top: "40%",
          subtextStyle: {
            fontSize: 16,
            fontWeight: 700,
          },
        },
      ],
      series: [
        {
          type: "pie",
          radius: ["41%", "55%"],
          data: salaryData.map((item) => {
            return {
              name: item.label,
              value: item.g_count,
            };
          }),
          label: {
            position: "outer",
            alignTo: "none",
            bleedMargin: 5,
          },

          top: "50%",
          bottom: 0,
        },
        {
          type: "pie",
          radius: ["35%", "45%"],

          data: salaryData.map((item) => {
            return {
              name: item.label,
              value: item.g_count,
            };
          }),
          label: {
            position: "outer",
            alignTo: "labelLine",
            bleedMargin: 5,
          },
          top: "-50%",
          bottom: 0,
        },
      ],
      color: ["#f5f361", "#0382a5", "#64c997", "#5a3988"],
    };
    sheet3.setOption(option3);
    const provinceData = res.data.provinceData;
    console.log(provinceData);
    const initMapChart = (provinceData) => {
      const myEchart = echarts.init(document.querySelector("#map"));
      const dataList = [
        { name: "南海诸岛", value: 0 },
        { name: "北京", value: 0 },
        { name: "天津", value: 0 },
        { name: "上海", value: 0 },
        { name: "重庆", value: 0 },
        { name: "河北", value: 0 },
        { name: "河南", value: 0 },
        { name: "云南", value: 0 },
        { name: "辽宁", value: 0 },
        { name: "黑龙江", value: 0 },
        { name: "湖南", value: 0 },
        { name: "安徽", value: 0 },
        { name: "山东", value: 0 },
        { name: "新疆", value: 0 },
        { name: "江苏", value: 0 },
        { name: "浙江", value: 0 },
        { name: "江西", value: 0 },
        { name: "湖北", value: 0 },
        { name: "广西", value: 0 },
        { name: "甘肃", value: 0 },
        { name: "山西", value: 0 },
        { name: "内蒙古", value: 0 },
        { name: "陕西", value: 0 },
        { name: "吉林", value: 0 },
        { name: "福建", value: 0 },
        { name: "贵州", value: 0 },
        { name: "广东", value: 0 },
        { name: "青海", value: 0 },
        { name: "西藏", value: 0 },
        { name: "四川", value: 0 },
        { name: "宁夏", value: 0 },
        { name: "海南", value: 0 },
        { name: "台湾", value: 0 },
        { name: "香港", value: 0 },
        { name: "澳门", value: 0 },
      ];
      provinceData.forEach((item) => {
        dataList.find((v) => {
          if (item.name.indexOf(v.name) !== -1) {
            v.value = item.value;
          }
        });
      });
      let option = {
        title: {
          text: "籍贯分布",
          top: 10,
          left: 10,
          textStyle: {
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} 位学员",
          borderColor: "transparent",
          backgroundColor: "rgba(0,0,0,0.5)",
          textStyle: {
            color: "#fff",
          },
        },
        visualMap: {
          min: 0,
          max: 6,
          left: "left",
          bottom: "20",
          text: ["6", "0"],
          inRange: {
            color: ["#ffffff", "#0075F0"],
          },
          show: true,
          left: 40,
        },
        geo: {
          map: "china",
          roam: false,
          zoom: 1.0,
          label: {
            normal: {
              show: true,
              fontSize: "10",
              color: "rgba(0,0,0,0.7)",
            },
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)",
              color: "#e0ffff",
            },
            emphasis: {
              areaColor: "#34D39A",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
        series: [
          {
            name: "籍贯分布",
            type: "map",
            geoIndex: 0,
            data: dataList,
          },
        ],
      };
      myEchart.setOption(option);
    };
    initMapChart(provinceData);

    const data = res.data.overview;
    for (const k in data) {
      document.querySelector(`[name="${k}"]`).innerHTML = data[k];
    }
  } catch (err) {
    console.log(err);
  }
});
