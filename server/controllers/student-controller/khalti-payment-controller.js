const axios = require("axios");

const processKhaltiPayment = async (req, res) => {
  try {
    const { token, amount } = req.body;

    if (!token || !amount) {
      return res.status(400).json({ success: false, message: "Invalid request" });
    }

    console.log("Received Khalti payment:", { token, amount });

    // Khalti verification API endpoint
    const khaltiUrl = "https://a.khalti.com/api/v2/payment/verify/";
    const khaltiSecretKey = "f251ac61c4134b5b91f1374c11154259"; // Replace this with your actual Khalti secret key

    const response = await axios.post(
      khaltiUrl,
      { token, amount },
      { headers: { Authorization: `Key ${khaltiSecretKey}` } }
    );

    console.log("Khalti Response:", response.data);

    return res.status(200).json({
      success: true,
      message: "Khalti payment processed successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("Khalti payment processing error:", error?.response?.data || error);
    return res.status(500).json({
      success: false,
      message: "Khalti payment processing failed",
    });
  }
};

module.exports = { processKhaltiPayment };
