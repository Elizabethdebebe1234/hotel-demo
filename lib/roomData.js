import Room from "@/models/Room";

const categories = [
  {
    id: "single",
    name: "Single Bedroom",
    beds: "1 Bed",
    price: 2500,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmu2VI7U0PDEWJnHonynRWNbRF5l6HoOIXRbesQKHJ6Q&s=10",
      "photo-1631049307264-da0ec9d70304",
      "photo-1616594039964-ae9021a400a0",
      "photo-1582719478250-c89cae4dc85b",
    ],
  },
  {
    id: "double",
    name: "Double Bedroom",
    beds: "2 Beds",
    price: 4000,
    images: [
      "photo-1590490360182-c33d57733427",
      "photo-1566665797739-1674de7a421a",
      "photo-1578683010236-d716f9a3f461",
      "photo-1611892440504-42a792e24",
    ],
  },
  {
    id: "premium",
    name: "Premium Bedroom",
    beds: "1 King Bed",
    price: 6500,
    images: [
      "photo-1616486338812-3dadae4b4ace",
      "photo-1618221195710-dd6b41faaea6",
      "photo-1600210492486-724fe5c67fb0",
      "photo-1616486029423-aaa4789e8c9a",
    ],
  },
  {
    id: "family",
    name: "Family Bedroom",
    beds: "3 Beds",
    price: 8500,
    images: [
      "photo-1566665797739-1674de7a421a",
      "photo-1595576508898-0ad5c879a061",
      "photo-1578683010236-d716f9a3f461",
      "photo-1582719478250-c89cae4dc85b",
    ],
  },
];

export async function ensureRooms() {
  const defaultRooms = categories.flatMap((category) =>
    [1, 2, 3, 4].map((number) => ({
      roomId: `${category.id}-${number}`,
      name: `${category.name} ${number}`,
      categoryId: category.id,
      price: category.price,
      beds: category.beds,
      image: category.images[number - 1],
    }))
  );

  await Room.bulkWrite(
    defaultRooms.map((room) => ({
      updateOne: {
        filter: { roomId: room.roomId },
        update: {
          $setOnInsert: {
            ...room,
            available: true,
          },
        },
        upsert: true,
      },
    }))
  );
}