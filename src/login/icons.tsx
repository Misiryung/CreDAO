import React from "react";

interface VisibilityIconProps {
  width: number;
  height: number;
  fill: string;
}

interface VisibilityOffIconProps {
  width: number;
  height: number;
  fill: string;
}

interface SelectedProps {
  width: number;
  height: number;
  fill: string;
}

interface UnselectedIconProps {
  width: number;
  height: number;
  fill: string;
}

const VisibilityIcon: React.FC<VisibilityIconProps> = ({
  width,
  height,
  fill,
}) => (
  <svg
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
  >
    <path
      d="M511.3 850.3c-184.5 0-339.5-156.9-415.5-250.5-42.4-52.3-42.4-128.1 0-180.4 76-93.6 231-250.5 415.5-250.5s339.5 156.9 415.5 250.5c42.5 52.3 42.4 128.1 0 180.4-76 93.6-230.9 250.5-415.5 250.5z m0-591.9c-147.4 0-280.1 136.2-346.1 217.5-15.4 19-15.4 48.7 0 67.6 66 81.2 198.6 217.4 346.1 217.4 147.5 0 280.1-136.2 346.1-217.4 15.4-19 15.4-48.7 0-67.6-65.9-81.3-198.6-217.5-346.1-217.5z"
    />
    <path
      d="M511.3 668.9c-86 0-156-70-156-156s70-156 156-156 156 70 156 156-70 156-156 156z m0-222.6c-36.7 0-66.6 29.9-66.6 66.6 0 36.7 29.9 66.6 66.6 66.6 36.7 0 66.6-29.9 66.6-66.6 0-36.8-29.9-66.6-66.6-66.6z"
    />
  </svg>
);

const VisibilityOffIcon: React.FC<VisibilityOffIconProps> = ({
  width,
  height,
  fill,
}) => (
  <svg
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
  >
    <path
      d="M512.2 819.1c-24.7 0-50-2.8-75.1-8.4-24.3-5.4-39.7-29.5-34.2-53.8 5.4-24.3 29.5-39.6 53.8-34.2 18.7 4.2 37.4 6.3 55.6 6.3 148.7 0 282.5-137.4 349-219.3 15.5-19.1 15.5-49.1 0-68.2-12.4-15.2-25.3-30.1-38.4-44.3-16.9-18.3-15.7-46.8 2.6-63.7 18.3-16.9 46.9-15.7 63.7 2.6 14.4 15.6 28.6 32 42.1 48.6 42.8 52.7 42.8 129.2 0 181.9-76.7 94.2-233 252.5-419.1 252.5zM220.6 681.9c-10.9 0-21.8-3.9-30.5-11.9-33.5-30.8-66.1-65.6-96.9-103.5-42.8-52.7-42.8-129.2 0-181.9 76.7-94.3 233-252.6 419-252.6 49.7 0 100.9 11.4 152 33.9 22.8 10 33.2 36.6 23.1 59.4-10 22.8-36.6 33.1-59.4 23.1-39.6-17.4-78.5-26.2-115.7-26.2-148.7 0-282.4 137.4-349 219.3-15.5 19.1-15.5 49.1 0 68.2 28 34.5 57.6 66.1 87.9 93.9 18.3 16.8 19.6 45.4 2.7 63.7-8.8 9.6-21 14.6-33.2 14.6z"
    />
    <path
      d="M451.6 618.4c-8.3 0-16.8-2.3-24.3-7.2C382 582.1 355 532.6 355 478.8c0-86.8 70.6-157.3 157.3-157.3 55.1 0 106.8 29.4 135.1 76.7 12.8 21.4 5.8 49.1-15.6 61.8-21.4 12.8-49.1 5.8-61.8-15.6-12.3-20.5-33.8-32.8-57.7-32.8-37 0-67.1 30.1-67.1 67.2 0 23 11.6 44.1 30.9 56.5 21 13.5 27 41.4 13.6 62.3-8.7 13.4-23.3 20.7-38.1 20.8z"
    />
    <path
      d="M165.3 920.1c-11.5 0-23.1-4.4-31.9-13.2-17.6-17.6-17.6-46.2 0-63.8L863 113.6c17.6-17.6 46.1-17.6 63.8 0 17.6 17.6 17.6 46.2 0 63.8L197.2 906.9c-8.9 8.8-20.4 13.2-31.9 13.2z"
    />
  </svg>
);

const SelectedIcon: React.FC<SelectedProps> = ({ width, height, fill }) => (
  <svg
    width={width}
    height={height}
    fill={fill}
    viewBox="0 0 175 175"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M123.045 56.2404L77.3666 101.919C76.1463 103.139 74.1676 103.139 72.9473 101.918L51.9551 80.9263C48.9041 77.8754 43.9576 77.8754 40.9066 80.9263C37.8557 83.9773 37.8557 88.9238 40.9066 91.9748L66.3182 117.387C71.1996 122.268 79.1145 122.268 83.9959 117.387L134.094 67.289C137.145 64.2381 137.145 59.2916 134.094 56.2406C131.043 53.1896 126.096 53.1894 123.045 56.2404Z"
    />
    <path
      d="M137.5 0H37.5C16.7893 0 0 16.7893 0 37.5V137.5C0 158.211 16.7893 175 37.5 175H137.5C158.211 175 175 158.211 175 137.5V37.5C175 16.7893 158.211 0 137.5 0ZM159.375 137.5C159.375 149.562 149.562 159.375 137.5 159.375H37.5C25.4381 159.375 15.625 149.562 15.625 137.5V37.5C15.625 25.4379 25.4381 15.625 37.5 15.625H137.5C149.562 15.625 159.375 25.4379 159.375 37.5V137.5Z"
    />
  </svg>
);

const UnselectedIcon: React.FC<UnselectedIconProps> = ({ width, height, fill }) => (
  <svg
    width={width}
    height={height}
    fill={fill}
    viewBox="0 0 175 175"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M137.5 0H37.5C16.7893 0 0 16.7893 0 37.5V137.5C0 158.211 16.7893 175 37.5 175H137.5C158.211 175 175 158.211 175 137.5V37.5C175 16.7893 158.211 0 137.5 0ZM159.375 137.5C159.375 149.562 149.562 159.375 137.5 159.375H37.5C25.4381 159.375 15.625 149.562 15.625 137.5V37.5C15.625 25.4379 25.4381 15.625 37.5 15.625H137.5C149.562 15.625 159.375 25.4379 159.375 37.5V137.5Z"
    />
  </svg>
);

export { VisibilityIcon, VisibilityOffIcon, SelectedIcon, UnselectedIcon };