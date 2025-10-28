import type React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, LoaderCircle, VideoIcon, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { PostService } from "@/services/post.service";
import locationService, {
  ResultDistrictResponse,
  ResultProvinceResponse,
  ResultWardResponse,
} from "@/services/location.service";
const postService = new PostService();

export default function CreatePostPage() {
  const nav = useNavigate();
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [open, setOpen] = useState(false);
  const locationRef = useRef<HTMLInputElement>(null);
  const ipSelectImage = useRef<HTMLInputElement>(null);
  const ipSelectVideo = useRef<HTMLInputElement>(null);
  const [selectedProvince, setProvince] = useState<ResultProvinceResponse>();
  const [selectedDistrict, setDistrict] = useState<ResultDistrictResponse>();
  const [listOfDistrict, setListDistrict] = useState<ResultDistrictResponse[]>(
    []
  );
  const [listOfWard, setListWard] = useState<ResultWardResponse[]>([]);
  const [selectedWard, setWard] = useState<ResultWardResponse>();
  const [listOfProvinces, setListProvince] = useState<ResultProvinceResponse[]>(
    []
  );
  const [isLoading, setLoading] = useState(false);
  const [streetName, setStreetName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [acreage, setAcreage] = useState("");
  const [interiorStatus, setInteriorStatus] = useState("");
  const [description, setDescription] = useState("");

  // State để lưu trữ các thông báo lỗi
  const [errors, setErrors] = useState({
    images: "",
    address: "",
    interiorStatus: "",
    acreage: "",
    price: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    locationService.getAllProvinces().then((res) => {
      if (res) {
        if (res.status === 200) {
          console.log(res.data.results);
          setListProvince(res.data.results);
        }
      }
    });
  }, []);

  useEffect(() => {
    console.log(selectedProvince);
    if (selectedProvince) {
      locationService
        .getDistrictsByProvinceId(selectedProvince.province_id)
        .then((res) => {
          console.log(res.data.results);
          setListDistrict(res.data.results);
        })
        .catch((e) => {
          console.log(e);
          setListDistrict([]);
        });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      locationService
        .getWardsByDistrictId(selectedDistrict.district_id)
        .then((res) => {
          setListWard(res.data.results);
        })
        .catch((e) => {
          console.log(e);
          setListWard([]);
        });
    }
  }, [selectedDistrict]);

  // Hàm kiểm tra tính hợp lệ của form
  const validateForm = () => {
    const newErrors = {
      images: "",
      address: "",
      interiorStatus: "",
      acreage: "",
      price: "",
      title: "",
      description: "",
    };

    let isValid = true;

    // Kiểm tra hình ảnh
    if (imgFiles.length === 0) {
      newErrors.images = "Vui lòng tải lên ít nhất 1 hình ảnh";
      isValid = false;
    }

    // Kiểm tra địa chỉ
    if (!locationRef.current?.value) {
      newErrors.address = "Vui lòng chọn địa chỉ đầy đủ";
      isValid = false;
    }

    // Kiểm tra tình trạng nội thất
    if (!interiorStatus) {
      newErrors.interiorStatus = "Vui lòng chọn tình trạng nội thất";
      isValid = false;
    }

    // Kiểm tra diện tích
    if (!acreage.trim()) {
      newErrors.acreage = "Vui lòng nhập diện tích";
      isValid = false;
    } else if (isNaN(Number(acreage)) || Number(acreage) <= 0) {
      newErrors.acreage = "Diện tích phải là số dương";
      isValid = false;
    }

    // Kiểm tra giá thuê
    if (!price.trim()) {
      newErrors.price = "Vui lòng nhập giá thuê";
      isValid = false;
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = "Giá thuê phải là số dương";
      isValid = false;
    }

    // Kiểm tra tiêu đề
    if (!title.trim()) {
      newErrors.title = "Vui lòng nhập tiêu đề tin đăng";
      isValid = false;
    } else if (title.length > 70) {
      newErrors.title = "Tiêu đề không được vượt quá 70 ký tự";
      isValid = false;
    }

    // Kiểm tra mô tả
    if (!description.trim()) {
      newErrors.description = "Vui lòng nhập mô tả chi tiết";
      isValid = false;
    } else if (description.length > 1000) {
      newErrors.description = "Mô tả không được vượt quá 1000 ký tự";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const createPost = async () => {
    // Kiểm tra validation trước khi submit
    if (!validateForm()) {
      toast("Vui lòng kiểm tra lại thông tin", {
        description: "Các trường đánh dấu * là bắt buộc và phải điền đầy đủ",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("acreage", acreage);
    formData.append("interiorStatus", interiorStatus);
    formData.append("city", selectedProvince?.province_name ?? "");
    formData.append("ward", selectedWard?.ward_name ?? "");
    formData.append("district", selectedDistrict?.district_name ?? "");
    formData.append("streetNumber", houseNumber);
    formData.append("street", streetName);
    formData.append("description", description);

    for (const img of imgFiles) {
      formData.append("imgs", img);
    }
    for (const video of videoFiles) {
      formData.append("video", video);
    }
    setLoading(true);
    postService
      .createPost(formData)
      .then((res) => {
        setLoading(false);
        if (res) {
          if (res.status === 200) {
            toast("Đăng tin thành công", {
              action: {
                label: "Trang tin",
                onClick: () => {
                  nav("/posts/my-posts");
                },
              },
            });
          } else if (res.status === 400) {
            // Check for AI moderation rejection
            if (res.data.message === "CONTENT_VIOLATION") {
              toast("Nội dung vi phạm quy định", {
                description:
                  "Tiêu đề hoặc mô tả của bạn có thể chứa nội dung không phù hợp. Vui lòng chỉnh sửa và thử lại.",
              });
            } else {
              toast("Đăng tin thất bại", {
                description:
                  "Thông tin nhập không hợp lí. Vui lòng kiểm tra lại.",
              });
            }
          } else {
            toast("Đăng tin thất bại", {
              description: "Đã xảy ra lỗi khi đăng tin. Vui lòng thử lại sau.",
            });
          }
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        toast("Đăng tin thất bại", {
          description: "Đã xảy ra lỗi khi đăng tin. Vui lòng thử lại sau.",
        });
      });
  };

  const onSelectImageListener = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      for (const file of e.target.files) {
        if (file.size > 1024 * 1024 * 5) {
          toast("Hình ảnh không được vượt quá 5MB", {});
          return;
        }
      }
      setImgFiles((currentFiles) => {
        if (e.target.files) {
          if (currentFiles.length + e.target.files.length <= 12) {
            // Xóa lỗi khi người dùng đã tải lên hình ảnh
            if (errors.images) {
              setErrors((prev) => ({ ...prev, images: "" }));
            }
            return [...currentFiles, ...Array.from(e.target.files)];
          } else {
            toast("Chỉ được đăng tối đa 12 hình ảnh", {});
          }
        }
        return currentFiles;
      });
    }
  };

  const onSelectVideoListener = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      for (const file of e.target.files) {
        if (file.size > 1024 * 1024 * 25) {
          toast("Video không được vượt quá 25MB", {});
          return;
        }
      }
      setVideoFiles((current) => {
        if (e.target.files) {
          if (current.length + e.target.files.length <= 1) {
            return [...current, ...Array.from(e.target.files)];
          } else {
            toast("Chỉ được đăng tối đa 1 video", {});
          }
        }
        return current;
      });
    }
  };

  const removeImage = (index: number) => {
    setImgFiles(imgFiles.filter((_, i) => i !== index));
    // Kiểm tra nếu không còn hình ảnh nào thì hiển thị lỗi
    if (imgFiles.length <= 1) {
      setErrors((prev) => ({
        ...prev,
        images: "Vui lòng tải lên ít nhất 1 hình ảnh",
      }));
    }
  };

  const removeVideo = (index: number) => {
    setVideoFiles(videoFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      <Dialog open={isLoading} onOpenChange={setLoading}>
        <DialogContent
          className="sm:max-w-[425px] [&>button]:hidden"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-center">
              Vui lòng chờ tin của bạn được lưu.
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-row justify-center items-center">
            <LoaderCircle className="animate-spin"></LoaderCircle>
          </div>
        </DialogContent>
      </Dialog>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Hình ảnh và Video sản phẩm *</h2>
          <Link to="#" className="text-primary text-sm hover:underline">
            Xem thêm về Quy định đăng tin của Trọ Tốt
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            onClick={() => {
              ipSelectImage.current?.click();
            }}
            className={`aspect-video flex flex-col items-center justify-center p-6 border-dashed border-2 cursor-pointer hover:bg-muted/50 ${
              errors.images ? "border-red-500" : ""
            }`}
          >
            <Camera className="w-12 h-12 text-muted-foreground mb-2" />
            <p className="text-sm text-center text-muted-foreground">
              ĐĂNG TỐI ĐA 12 HÌNH
            </p>
            <p className="text-xs text-center text-muted-foreground mt-1">
              {imgFiles.length}/12 hình ảnh
            </p>
          </Card>
          <Input
            type="file"
            ref={ipSelectImage}
            accept="image/*"
            multiple
            onChange={onSelectImageListener}
            className="hidden"
          />
          <Card
            onClick={() => {
              ipSelectVideo.current?.click();
            }}
            className="aspect-video flex flex-col items-center justify-center p-6 border-dashed border-2 cursor-pointer hover:bg-muted/50"
          >
            <VideoIcon className="w-12 h-12 text-muted-foreground mb-2" />
            <p className="text-sm text-center text-muted-foreground">
              ĐĂNG TỐI ĐA 01 VIDEO
            </p>
            <p className="text-xs text-center text-muted-foreground mt-1">
              {videoFiles.length}/1 video
            </p>
          </Card>
          <Input
            type="file"
            accept="video/*"
            ref={ipSelectVideo}
            onChange={onSelectVideoListener}
            className="hidden"
          />
        </div>

        {errors.images && (
          <p className="text-sm text-red-500">{errors.images}</p>
        )}

        {/* Image Preview */}
        {imgFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Hình ảnh đã chọn</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {imgFiles.map((file, index) => (
                <div key={`img-${index}`} className="relative group">
                  <div className="aspect-square rounded-md overflow-hidden border">
                    <img
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-[#ff6d0b] text-white text-xs py-1 text-center">
                      Ảnh bìa
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Preview */}
        {videoFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Video đã chọn</h3>
            <div className="grid grid-cols-1 gap-3">
              {videoFiles.map((file, index) => (
                <div key={`video-${index}`} className="relative group">
                  <div className="aspect-video rounded-md overflow-hidden border bg-black">
                    <video
                      src={URL.createObjectURL(file)}
                      controls
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeVideo(index);
                    }}
                    className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <Label>Địa chỉ nhà trọ *</Label>
          <Input
            onClick={() => setOpen(true)}
            ref={locationRef}
            placeholder="Địa chỉ nhà trọ"
            className={errors.address ? "border-red-500" : ""}
            readOnly
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address}</p>
          )}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger />
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Chọn địa chỉ</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="items-center gap-4">
                  <Label htmlFor="city">Chọn thành phố *</Label>
                  <Select
                    defaultValue={selectedProvince?.province_id ?? undefined}
                    onValueChange={(value) => {
                      setProvince(
                        listOfProvinces.find(
                          (province) => province.province_id === value
                        )
                      );
                      setDistrict(undefined);
                      setListDistrict([]);
                      setListWard([]);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {listOfProvinces.map((province) => (
                          <SelectItem
                            key={province.province_id}
                            value={province.province_id}
                          >
                            {province.province_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="ward">Chọn quận, huyện *</Label>
                  <Select
                    defaultValue={selectedDistrict?.district_id ?? undefined}
                    onValueChange={(value) => {
                      setDistrict(
                        listOfDistrict.find(
                          (district) => district.district_id === value
                        )
                      );
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn quận, huyện" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {listOfDistrict.map((district) => (
                          <SelectItem
                            key={district.district_id}
                            onClick={() => {
                              console.log(district);
                              setDistrict(district);
                            }}
                            value={district.district_id}
                          >
                            {district.district_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="ward">Chọn phường, xã, thị trấn *</Label>
                  <Select
                    defaultValue={selectedWard?.ward_id ?? undefined}
                    onValueChange={(value) =>
                      setWard(listOfWard.find((ward) => ward.ward_id === value))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn phường, xã, thị trấn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {listOfWard.map((ward) => (
                          <SelectItem key={ward.ward_id} value={ward.ward_id}>
                            {ward.ward_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="">Tên đường *</Label>
                  <Input
                    value={streetName}
                    required
                    onChange={(e) => {
                      setStreetName(e.target.value);
                    }}
                    className="col-span-3"
                  />
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="">Số nhà *</Label>
                  <Input
                    value={houseNumber}
                    required
                    onChange={(e) => {
                      setHouseNumber(e.target.value);
                    }}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    if (
                      !houseNumber.trim() ||
                      !streetName.trim() ||
                      !selectedProvince ||
                      !selectedDistrict ||
                      !selectedWard
                    ) {
                      toast("Vui lòng nhập đủ địa chỉ", {});
                      return;
                    }
                    setOpen(false);
                    if (locationRef.current) {
                      locationRef.current.value = `${houseNumber} ${streetName}, ${selectedWard.ward_name}, ${selectedDistrict?.district_name}, ${selectedProvince?.province_name}`;
                      // Xóa lỗi khi người dùng đã nhập địa chỉ
                      if (errors.address) {
                        setErrors((prev) => ({ ...prev, address: "" }));
                      }
                    }
                  }}
                >
                  Lưu thay đổi
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <Label>Tình trạng nội thất *</Label>
          <Select
            onValueChange={(value) => {
              setInteriorStatus(value);
              // Xóa lỗi khi người dùng đã chọn
              if (errors.interiorStatus) {
                setErrors((prev) => ({ ...prev, interiorStatus: "" }));
              }
            }}
          >
            <SelectTrigger
              className={`w-full ${
                errors.interiorStatus ? "border-red-500" : ""
              }`}
            >
              <SelectValue placeholder="Tình trạng nội thất" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full">Đầy đủ nội thất</SelectItem>
              <SelectItem value="None">Nhà trống</SelectItem>
            </SelectContent>
          </Select>
          {errors.interiorStatus && (
            <p className="text-sm text-red-500">{errors.interiorStatus}</p>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Diện tích & giá *</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Diện tích (Đơn vị m²) *</Label>
              <Input
                placeholder="Diện tích"
                value={acreage}
                onChange={(e) => {
                  setAcreage(e.target.value);
                  // Xóa lỗi khi người dùng đã nhập
                  if (errors.acreage) {
                    setErrors((prev) => ({ ...prev, acreage: "" }));
                  }
                }}
                type="number"
                className={errors.acreage ? "border-red-500" : ""}
              />
              {errors.acreage && (
                <p className="text-sm text-red-500">{errors.acreage}</p>
              )}
            </div>
            <div>
              <Label>Giá thuê (Đơn vị VNĐ) *</Label>
              <Input
                placeholder="Giá thuê"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  // Xóa lỗi khi người dùng đã nhập
                  if (errors.price) {
                    setErrors((prev) => ({ ...prev, price: "" }));
                  }
                }}
                type="number"
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Tiêu đề tin đăng và Mô tả chi tiết</h3>
          <div>
            <Label>Tiêu đề tin đăng *</Label>
            <Input
              placeholder="0/70 kí tự"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                // Xóa lỗi khi người dùng đã nhập
                if (errors.title) {
                  setErrors((prev) => ({ ...prev, title: "" }));
                }
              }}
              className={errors.title ? "border-red-500" : ""}
              maxLength={70}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {title.length}/70 kí tự
            </p>
          </div>
          <div>
            <Label>Mô tả chi tiết *</Label>
            <Textarea
              placeholder="Nên mô tả: Phòng trọ, vị trí, tiện ích, diện tích, tình trạng nội thất, v.v.
Ví dụ: Phòng trọ 30m2 đường Nguyễn X, Bình Thạnh, nội thất đầy đủ."
              className={`min-h-[250px] ${
                errors.description ? "border-red-500" : ""
              }`}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                // Xóa lỗi khi người dùng đã nhập
                if (errors.description) {
                  setErrors((prev) => ({ ...prev, description: "" }));
                }
              }}
              maxLength={1000}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {description.length}/1000 kí tự
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" className="flex-1">
          Xem trước
        </Button>
        <Button
          onClick={createPost}
          className="flex-1 bg-[#ff6d0b] hover:bg-[#ff6d0b]/90"
        >
          Đăng tin
        </Button>
      </div>
    </div>
  );
}
