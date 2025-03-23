const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

function createScene() {
  const scene = new BABYLON.Scene(engine);

  // Tambahkan kamera dan lampu
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 3,
    5,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0),
    scene
  );

  return scene;
}

const scene = createScene();

// Fungsi untuk memuat model berdasarkan tipe file
function loadModel(folder, filename) {
  const fileExtension = filename.split(".").pop().toLowerCase();

  if (fileExtension === "obj") {
    // Load file OBJ
    BABYLON.SceneLoader.ImportMesh(
      "",
      folder,
      filename,
      scene,
      function (meshes) {
        console.log("Model OBJ berhasil dimuat!", meshes);

        // Perbesar model
        meshes.forEach((mesh) => {
          mesh.scaling = new BABYLON.Vector3(5, 5, 5); // Ubah skala sesuai kebutuhan
        });
      }
    );
  } else if (fileExtension === "gltf" || fileExtension === "glb") {
    // Load file GLTF / GLB
    BABYLON.SceneLoader.Append(folder, filename, scene, function (scene) {
      console.log("Model GLTF/GLB berhasil dimuat!");

      // Tunggu model selesai dimuat, lalu cari root mesh
      scene.executeWhenReady(() => {
        const rootMesh = scene.meshes[0]; // Biasanya mesh pertama adalah root
        rootMesh.scaling = new BABYLON.Vector3(5, 5, 5); // Perbesar model
      });
    });
  } else {
    console.error("Format tidak didukung:", fileExtension);
  }
}

// Panggil fungsi loadModel (ubah nama file jika perlu)
loadModel("Venom Multicolor obj/", "model.gltf"); // Bisa diganti dengan "model.obj" atau "model.glb"

engine.runRenderLoop(() => scene.render());
window.addEventListener("resize", () => engine.resize());
