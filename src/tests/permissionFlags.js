/* All we need to do is define each kind of permission (a permission flag) as a power of 2 (1, 2, 4, 8, 16, 32, …). Then we can attach business logic to each flag, up to a maximum of 31 flags. For example, an audio-accessible, international blog might have these permissions:

1: Authors can edit text.
2: Illustrators can replace illustrations.
4: Narrators can replace the audio file corresponding to any paragraph.
8: Translators can edit translations.
This approach allows for all sorts of permission flag combinations for users:

- An author’s (or editor’s) permission flags value will be just the number 1.
- An illustrator’s permission flags will be the number 2. But some authors are also illustrators. In that case, we sum the relevant permissions values: 1 + 2 = 3.
- A narrator’s flags will be 4. In the case of an author who narrates their own work, it will be 1 + 4 = 5. If they also illustrate, it’s 1 + 2 + 4 = 7.
- A translator will have a permission value of 8. Multilingual authors would then have flags of 1 + 8 = 9. A translator who also narrates (but is not an author) would have 4 + 8 = 12.
- If we want to have a sudo admin, having all combined permissions, we can simply use 2,147,483,647, which is the maximum safe value for a 32-bit integer.

- User with permission 5 trying to edit text (permission flag 1):
Input: 5 & 1

Output: 1

- User with permission 1 trying to narrate (permission flag 4):
Input: 1 & 4

Output: 0

- User with permission 12 trying to narrate:
Input: 12 & 4

Output: 4

When the output is 0, we block the user; otherwise, we let them access what they are trying to access.

*/

const user = { permissionFlags: 1 };

function evaluateUserPermission(user, permissionRequired) {
  user.permissionFlags & permissionRequired
    ? console.log("Acceso permitido")
    : console.log("Acceso denegado");
}

evaluateUserPermission(user, 4);

console.log("permissionFlags" in user);
