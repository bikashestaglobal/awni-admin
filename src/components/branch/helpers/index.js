export default function tableToCSV(fileName = "csv-format.csv", table) {
  // Variable to store the final csv data
  var csv_data = [];

  // Get each row data
  var rows = table.getElementsByTagName("tr");

  console.log(rows);

  for (var i = 0; i < rows.length; i++) {
    // Get each column data
    var cols = rows[i].querySelectorAll("td,th");

    // Stores each csv row data
    var csvrow = [];
    for (var j = 0; j < cols.length; j++) {
      // Get the text data of each cell
      // of a row and push it to csvrow
      csvrow.push(cols[j].innerHTML);
    }

    // Combine each column value with comma
    csv_data.push(csvrow.join(","));
  }

  // Combine each row data with new line character
  csv_data = csv_data.join("\n");

  // Call this function to download csv file
  downloadCSVFile(csv_data, fileName);
}

export function downloadCSVFile(csv_data, fileName) {
  // Create CSV file object and feed
  // our csv_data into it

  let CSVFile = new Blob([csv_data], {
    type: "text/csv",
  });

  // Create to temporary link to initiate
  // download process
  var temp_link = document.createElement("a");

  // Download csv file
  temp_link.download = `${fileName}`;
  var url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;

  // This link should not be displayed
  temp_link.style.display = "none";
  document.body.appendChild(temp_link);

  // Automatically click the link to
  // trigger download
  temp_link.click();
  document.body.removeChild(temp_link);

  // const table = document.querySelector("#download-csv");
  // document.body.removeChild(table);
}

export async function getImageDimensions(file) {
  let img = new Image();
  img.src = URL.createObjectURL(file);
  await img.decode();
  let width = img.width;
  let height = img.height;
  return {
    width,
    height,
  };
}

export function checkImageFile(file) {
  const fileType = file["type"];
  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
  if (!validImageTypes.includes(fileType)) return false;
  return true;
}

export const compressImage = (file, maxWidth, maxHeight, quality) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;

      image.onload = () => {
        let width = image.width;
        let height = image.height;

        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }

        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          file.type,
          quality
        );
      };

      image.onerror = (error) => {
        reject(error);
      };
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export const convertByteToMb = (byte) => {
  let result = byte / 1024;
  if (result >= 1024) {
    result = `${(result / 1024).toFixed(2)} MB`;
  } else {
    result = `${result.toFixed(2)} KB`;
  }
  return result;
};
