
    console.log('𝖘𝖍𝖚𝖙 𝖚𝖕 𝖋𝖆𝖌𝖌𝖔𝖙😍 Upload script loaded');

    document.getElementById('saveBtn').addEventListener('click', async () => {

        if (pond.getFiles().length === 0) {
            alert('Nejsou vybrány žádné soubory');
            return;
        }

        try
        {

            const uploadError = document.getElementById('uploadError');
            const completionC = document.getElementById('completionC');

            await pond.processFiles(); // ⬅️ počká na dokončení uploadu

            setTimeout(() => {
                pond.removeFiles(); // vyčistí seznam
                /* alert('Soubory byly nahrány'); */

                completionC.style.display="flex";

                uploadError.textContent = "";
                uploadError.style.display = "none";

            }, 1000);

        } catch (err) {

            setTimeout(() => {

                console.error(err);
                alert('Upload se nepodařil ' + err.error.body);

            }, 1000);
        }
    });


    document.addEventListener("dragover", function (e)
    {
            e.preventDefault();
    });

    document.addEventListener("drop", function (e) {
        e.preventDefault();
    });



    const crossBtn = document.getElementById("crossBtn");
    const acknoledgeBtn = document.getElementById("acknoledgeBtn");
    const container = document.getElementById("completionC")

    crossBtn.addEventListener("click", () =>
    {
        container.style.display = "none";
    });

    acknoledgeBtn.addEventListener("click", () =>
    {
        container.style.display = "none";
    });



    /* Velikost okna */


    const width = window.innerWidth;
    const height = window.innerHeight;

    console.log("Šířka:", width);
    console.log("Výška:", height);

    window.addEventListener("resize", () =>
    {
        console.log("Nová šířka:", window.innerWidth);
        console.log("Nová výška:", window.innerHeight);
    });

    console.log("Celá obrazovka", screen.width);


