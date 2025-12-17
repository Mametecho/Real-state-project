import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      MinLength: [6, "Password must be at least 6 characters long"],
    },
    avatar: {
      type: String,
      default:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAACUCAMAAABRNbASAAAAMFBMVEXk5ueutLfn6eqrsbTh4+S0ubzd4OG7wMLKztDS1dfW2drAxcfN0dPEyMqorrG4vcBqnWuJAAAESElEQVR4nO2b25arIAyGJRzkpL7/226w1WrHtggJuPbyv5lp52K+FUggIem6W7du3bp169atW1UFAK0R/ioyCWWN995YJR5fXEIAwmon+TjyqPBDOm3FJfDAOsk4Z1uFj9LZ1uYDpeW4B1s1Mq8a4gFo+YHsYUA5tLIedIZ/Q5vxmG/DpvpfaPPiuhZr61kKW5SpTjeMiWhhbYfKbElLutL1NW0nvjrpAd1Ub+OJ6RxbDCrV4JJdYWs7UYft1H5b6arsOxhy2KLP0tOBT48hb3SGHE5lokWRb7vTjrox3US7sODz2eLCktKJArQgSbqwmZ66mo7SY0u84SE600FW+K1kOlHKRrjrYChmY9wTmU5M5XCMEcHZ8lUNOYUiYQOHAcdoXAJQ2BjNxU7lXkfeZAnYyo7Vl0j8FXoUNsYdPlvIuHDgGEWuY5HY2IjP1hk0OAKPQPKHAEdw5Sy8yr3ENT4czvkQ5dDhyu9yq/DTayhIu96En4TdcP8nHJ5DXBqOoBiGF4QJ7sIaDQ7/QgcG7WwlOPjxrkwESYTCumxyfLauQ0mpGUUkQcwhKB6bwOCkhjTlTYEDJ0nqEYDjEURVa5QwTFUDKy+6MprEcBaCv5I9gWGcYJyijPOgK7dcT8VW8Ci3Go7wDae4mEP5YF266+h23ExXdPpzuh03SxWZjqaSvir3ET1qpHogeSk7C6Ne1CDIfnKluY680WWWOLmt0ruRd+us1AuW4xQVnGGhO32zoyi1ftRJunp2izrlFZxV8YUNnU1uoeOyetcmpJbXuWvRbA0mwXhcVl7SlU4MPxqF+ajb9aiHtf1iPS6Hrml7Oih/3JzOx6lpa/oTD9QgYyP/gjj/JnV7socCn9FDP8moqR+0Ua3HDXaaYUTU8uEqggO1ZuoeWJ2yRmvXr3KD9saKhowAQoWd1rMxah/v5kmc8OXkfBwXqosYLGKDqSTnv4Jw+PvktBGV+MJ/UcFePL0FnM/h2ArygAzCDNMvex0Sjsx5ygATFtOxjKb5hS8sMdFEDnT28xTVCUCHP64WjNbn22yPJzXq7gPhGVJ/2sw3OoXFB9330bMcPIY1cKVxwZ54vC9+PATw2FZ74Q1lrgEK66nwEE8WpNohR0B0g2O83PTnRGqaT8ey5jjpzfbEyzAeKHqzLTpdSEmfwSzX2ahSZ0lXulPVFLzWoES69DrU2RlMDKV2mVZ0hY3Sap9lbzT5GnWK3dqwpdiucOqsSL8qx2jd8Vn68VRcO4a868sLFNKUTYk+nhV4/XvZ+jzJgdLUUqhPLovYCVyg48fF8w9aNJquuqhRRwuL2KRcKP7HY8FWvcF91d9eLMoc8KzeQ3H7EPfSexsbUssjksb9rR1ryBFHfDdChNUDjKbtrrtKjFu06zpFm4bDktxY7jIBeNFm8hphPh9ZrzMMq+scU2sfdklPHJmWA/ZaEfip5VrXMh38pHnT/QPOITooAy1cIwAAAABJRU5ErkJggg==",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
