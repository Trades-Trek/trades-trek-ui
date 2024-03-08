import moment from "moment-timezone";
import React from "react";
import { jsPDF } from "jspdf";

// Default export is a4 paper, portrait, using millimeters for units

const SubscriptionCart = ({ item, user }) => {

  const handlePrint = (data) => {
    // window.print();
    const doc = new jsPDF({
      unit: "in",
      format: [6, 5],
    });
    var image = new Image();
    image.src = "/images/logo.png";
    doc.addImage(image, "PNG", 2, 0.5, 1, 0.3);
    doc.setFontSize(9);
    doc.text(`${moment().format("L")} , `, 0.1, 0.3);
    doc.text(moment().format("LT"), 0.83, 0.3);
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");

    doc.text("Sector 63, Noida", 0.2, 1.3);
    doc.setFont(undefined, "normal");
    doc.setFontSize(9);

    doc.text("Noida Central Noida, Pin Code: 201307", 0.2, 1.5);

    doc.text(data?.user?.email, 0.2, 1.7);
    doc.text("Receipt #", 0.3, 2.4);
    doc.text(data.invoiceId, 1, 2.4);

    doc.setLineWidth(0.001);
    doc.rect(0.3, 2.7, 4.4, 0.3);
    // heading .......
    doc.text("Date", 0.35, 2.88);
    doc.text("Description", 1, 2.88);
    doc.text("Service Period", 1.8, 2.88);
    doc.text("Amount", 3, 2.88);
    doc.text("Vat %", 3.6, 2.88);
    doc.text("Vat", 4, 2.88);
    doc.text("Total", 4.3, 2.88);
    // value ....
    doc.setFontSize(7);

    doc.text(moment(data.createdAt).format("L"), 0.35, 3.3);
    doc.text(data?.result?.packageName, 1, 3.3);
    doc.text(
      `${moment(data.createdAt).format("L")}-${moment(data.updatedAt).format(
        "L"
      )}`,
      1.8,
      3.3
    );
    doc.text(data?.result?.packageAmount?.toFixed(2), 3, 3.3);
    doc.text("0 %", 3.6, 3.3);
    doc.text("0.00", 4, 3.3);
    doc.text(data?.result?.packageAmount?.toFixed(2), 4.3, 3.3);

    doc.rect(0.3, 3, 4.4, 1);
    doc.rect(0.3, 4, 4.4, 0.9);
    doc.rect(3.7, 4, 1, 0.9);

    // text ....
    doc.setFont(undefined, "bold");

    doc.text("SUBTOTAL", 2.7, 4.25);
    doc.text("VAT TOTAL", 2.7, 4.45);
    doc.text("TOTAL", 2.7, 4.65);
    doc.setFont(undefined, "bold");
    // value ... \
    doc.setFont(undefined, "normal");

    doc.text(data?.result?.packageAmount?.toFixed(2), 3.8, 4.25);
    doc.text("0.00", 3.8, 4.45);
    doc.text(data?.result?.packageAmount?.toFixed(2), 3.8, 4.65);

    // set image
    doc.text("Payment Method:", 0.3, 5.19);

    image.src = "/images/master.png";
    doc.addImage(image, "PNG", 1.3, 5.1, 0.2, 0.1);
    doc.text(
      `**** **** **** ${data?.last4 ? data?.last4 : "****  "}`,
      1.55,
      5.19
    );

    doc.save("a4.pdf");
  };

  const ExpiredDate = ({ item }) => {
    if (item?.result && item.result.packageDuration !== "free-lifetime") {
      return <p>Subscription Expired Date {moment(item.expireDate).format("lll")}</p>;
    }
  
    return null;
  };

  
  return (
    <div
      className={`block--info subscription ${item?.result?._id ==
        user?.user?.subscriptionId &&
        item?.status &&
        "activeSubscription"}`}
    >
      <div className="info--title">
        <span>
          <span className="currency">₦</span>{" "}
          {item?.result?.packageAmount
            ?.toFixed(2)
            ?.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
        <span>{item?.result?.packageDuration.toUpperCase()}</span>
      </div>
      <div className="info--text">
        <p>{item?.result?.packageName}</p>
      </div>
      <div className="info--text">
        <p>
          Subscription Purchase Date {moment(item?.createdAt).format("lll")}
        </p>
      </div>

      <div className="info--text">
        <p>
          Activation Date {moment(item?.activationDate).format("lll")}
        </p>
      </div>

      <ExpiredDate item={item} />

      <button onClick={() => handlePrint(item)}>Print</button>
    </div>
  );
};

export default SubscriptionCart;
