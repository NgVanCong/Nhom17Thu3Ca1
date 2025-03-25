document.addEventListener("DOMContentLoaded", async function () {
    const startCallBtn = document.getElementById("start-call");
    const endCallBtn = document.getElementById("end-call");
    const videoContainer = document.getElementById("video-container");

    let callFrame;

    startCallBtn.addEventListener("click", async () => {
        const roomURL = "https://vancong.daily.co/ottJJw1SrT3q2ZmnJHR9"; // Thay bằng URL phòng

        if (!roomURL.startsWith("https://")) {
            alert("URL phòng không hợp lệ!");
            return;
        }

        startCallBtn.style.display = "none";
        endCallBtn.style.display = "inline-block";

        callFrame = window.DailyIframe.createFrame(videoContainer, {
            showLeaveButton: true,
            iframeStyle: {
                width: "100%",
                height: "100%",
                border: "0",
            },
        });

        await callFrame.join({ url: roomURL });

        callFrame.on("left-meeting", () => {
            videoContainer.innerHTML = "";
            startCallBtn.style.display = "inline-block";
            endCallBtn.style.display = "none";
        });
    });

    endCallBtn.addEventListener("click", async () => {
        if (callFrame) {
            await callFrame.leave();
            callFrame.destroy();
            videoContainer.innerHTML = "";
            startCallBtn.style.display = "inline-block";
            endCallBtn.style.display = "none";
        }
    });
});
