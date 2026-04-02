
    console.log('𝖘𝖍𝖚𝖙 𝖚𝖕 𝖋𝖆𝖌𝖌𝖔𝖙😍 Upload script loaded');

    document.getElementById('saveBtn').addEventListener('click', async () => {

        if (pond.getFiles().length === 0) {
            alert('Nejsou vybrány žádné soubory');
            return;
        }

        try
        {

            const uploadError = document.getElementById('uploadError');

            await pond.processFiles(); // ⬅️ počká na dokončení uploadu

            setTimeout(() => {
                pond.removeFiles(); // vyčistí seznam
                alert('Soubory byly nahrány');
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

