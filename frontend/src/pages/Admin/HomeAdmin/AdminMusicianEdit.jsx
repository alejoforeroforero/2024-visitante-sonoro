import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { useAdminGetStatus } from '../../../hooks/useAdminGetStatus';
import { getMusician } from '../../../redux/states/MusiciansSlice/MusiciansActions';
import { createMusician } from '../../../redux/states/MusiciansSlice/MusiciansActions';
import { updateMusician } from '../../../redux/states/MusiciansSlice/MusiciansActions';
import TextField from '@mui/material/TextField';
import AdminHeader from './components/AdminHeader';
import Loader from '../../../components/loader/Loader';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


import "./HomeAdmin.css";

const AdminMusicianEdit = () => {
  useAdminGetStatus(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector(state => state.adminReducer);
  const musicianReducer = useSelector(state => state.musiciansReducer.musician);
  const [withData, setWithData] = useState(false);
  const [creatingMusician, setCreatingMusician] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
  const { musicianId } = useParams();

  useEffect(() => {
    if (musicianId) {
      dispatch(getMusician(musicianId))
    }
  }, [dispatch])

  useEffect(() => {
    if (musicianReducer._id) {
      setCreatingMusician(false);
    }

    reset({
      name: musicianReducer?.name,
      url: musicianReducer?.url,
      description: musicianReducer?.description,
      age: musicianReducer?.age
    });

    setWithData(true);
    setShowLoader(false);

    setImagePreview(
      musicianReducer && musicianReducer.image ? `${musicianReducer.image.filePath}` : null
    );

  }, [musicianReducer])

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({});

  const onSubmit = async (data) => {
    setShowLoader(true);
    try {
      await new Promise((resolve) => {
        const imgS = (data.image.length > 0) ? data.image[0] : musicianReducer.image;

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("url", data.url);
        formData.append("description", data.description);
        formData.append("image", imgS);
        formData.append("age", data.age);

        if (creatingMusician) {
          dispatch(createMusician(formData)).then(res => {
            if (res.payload.data) {
              resolve();
              navigate('/admin/musicians')
            } else {
              resolve();
            }
            setShowLoader(false);
          })
        } else {
          const musicianObj = {
            id: musicianReducer._id,
            data: formData
          }
          dispatch(updateMusician(musicianObj)).then((res) => {
            if (res.payload.data) {
              resolve();
              navigate('/admin/musicians')
            } else {
              resolve();
            }
            setShowLoader(false);
          })
        }
      })

    } catch (error) {
      setError("name", {
        message: 'This name does not work'
      })
      setShowLoader(false);
    }
  }

  const handleSetImagePreview = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  }

  const setDescription = (editorState) => {
    setValue("description", editorState);
  };

  const editorContent = watch("description");

  return (
    <>
      {showLoader && <Loader />}
      {admin.isSignedIn &&
        <AdminHeader />
      }
      {withData &&
        <form className="admin-musician-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="admin-musician-form-div">
            <TextField
              {...register('name', {
                required: "Debes poner un nombre",
              })}
              type="text"
              label="Nombre"
              variant="filled"
              placeholder="nombre"
              fullWidth
            />
            {errors.name && <div className="admin-musician-form-error">{errors.name.message}</div>}
          </div>
          <div className="admin-musician-form-div">
            <TextField
              {...register('url', {
                required: "Debes poner un url",
                minLength: {
                  value: 3,
                  message: "La url debe ser de minimo 3 letras. Asegurate que no exista otro músico con la misma url"
                },
              })}
              type="text"
              label="Url"
              variant="filled"
              placeholder="Url"
              fullWidth
            />
            {errors.url && <div className="admin-musician-form-error">{errors.url.message}</div>}
          </div>
          <div className="admin-musician-form-div">
            {/* <TextField
              {...register('description')}
              type="text"
              label="Descripción"
              variant="filled"
              placeholder="Descripción"
              fullWidth
            /> */}
            <ReactQuill
              theme="snow"
              onChange={setDescription}
              value={editorContent}
              modules={ProductForm.modules}
              formats={ProductForm.formats}
            />
          </div>
          <div className="admin-musician-form-div">
            <TextField
              {...register('image')}
              type="file"
              label="Imagen"
              variant="filled"
              placeholder="imagen"
              fullWidth
              onChange={handleSetImagePreview}
            />
          </div>
          {imagePreview != null ?
            <div className="admin-musician-form-div">
              <img src={imagePreview} />
            </div>
            :
            <div>No se ha asignado imagen</div>
          }
          <div className="admin-musician-form-div">
            <TextField
              {...register('age')}
              type="text"
              label="Edad"
              placeholder="Edad"
              variant="filled"
              fullWidth
            />
          </div>
          <div className="admin-musician-form-button">
            <button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Loading" : "Submit"}
            </button>
          </div>
        </form>
      }

    </>
  )
}

const ProductForm = ({})

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default AdminMusicianEdit