import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5percent from "@amcharts/amcharts5/percent";
import { Box } from "@chakra-ui/react";

interface Props {
  jobs: any;
}

const JobChart = ({ jobs }: Props) => {
  // Calculate job percentages
  const calculateJobPercentage = (status) => {
    if (jobs) {
      const totalJobs = jobs.length;
      const matchingJobs = jobs?.filter(
        (job) => job.jobStatus.status === status
      );
      const count = matchingJobs.length;
      const percentage = (count / totalJobs) * 100;
      return percentage.toFixed(1); // Round to one decimal place
    }
    return 0;
  };

  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!jobs) return;
    const root = am5.Root.new(chartRef.current);
    root._logo.dispose();

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270,
        layout: root.verticalLayout,
        innerRadius: am5.percent(60),
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        endAngle: 270,
      })
    );

    series.set(
      "colors",
      am5.ColorSet.new(root, {
        colors: [
          am5.color(0x73556e),
          am5.color(0x9fa1a6),
          am5.color(0xf2aa6b),
          am5.color(0xf28f6b),
          am5.color(0xa95a52),
          am5.color(0xe35b5d),
        ],
      })
    );

    const chartData = [
      {
        category: "Cancelled",
        value: calculateJobPercentage("Cancelled"),
      },
      {
        category: "Pending",
        value: calculateJobPercentage("Pending"),
      },
      {
        category: "Open",
        value: calculateJobPercentage("Resolved"),
      },
      {
        category: "Assigned",
        value: calculateJobPercentage("Assigned"),
      },
      {
        category: "Resolved",
        value: calculateJobPercentage("Resolved"),
      },
    ];

    series.data.setAll(chartData);

    return () => {
      root.dispose();
    };
  }, [jobs]);

  return (
    <Box
      ref={chartRef}
      w="100%"
      h={{
        base: "100px",
        md: "300px",
        lg: "120px",
        xl: "220px",
        "2xl": "250px",
      }}
    />
  );
};

export default JobChart;
