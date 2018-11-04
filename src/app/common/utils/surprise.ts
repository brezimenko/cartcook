const ingredients = ['Coarse salt', 'Coriander', 'Fennel ', 'Paprika', 'Oregano', 'Turmeric', 'Nutmeg', 'Cayenne pepper', 'Thyme ', 'Butter', 'Eggs', 'Parmesan', 'Bacon', 'Parsley', 'Celery ', 'Carrots', 'Lemons', 'Limes'];

export const getSurprise = () => {
  return ingredients[Math.floor(Math.random() * ingredients.length)];
};
