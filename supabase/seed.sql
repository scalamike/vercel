insert into public.cats
  (id, name, breed, age, gender, location, image, description, traits, featured)
values
  (
    'miso', 'Miso', 'Domestic shorthair', '2 years', 'Female', 'Brooklyn, NY',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=85',
    'A soft-hearted window watcher who believes every lap is an invitation.',
    array['Gentle', 'Lap cat', 'Good with cats'], true
  ),
  (
    'fig', 'Fig', 'Tabby mix', '8 months', 'Male', 'Queens, NY',
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1000&q=85',
    'Equal parts curious explorer and enthusiastic toy-chaser. Fig makes an ordinary day feel like a little adventure.',
    array['Playful', 'Curious', 'Good with kids'], false
  ),
  (
    'olive', 'Olive', 'Tortoiseshell', '4 years', 'Female', 'Brooklyn, NY',
    'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&w=1000&q=85',
    'A quietly confident companion with a fondness for sunny spots and unhurried afternoons.',
    array['Calm', 'Independent', 'Indoor only'], false
  ),
  (
    'mochi', 'Mochi', 'Domestic longhair', '1 year', 'Male', 'Jersey City, NJ',
    'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1000&q=85',
    'A friendly fluffball who greets new people with a slow blink and a hopeful purr.',
    array['Affectionate', 'Social', 'Good with cats'], false
  )
on conflict (id) do update set
  name = excluded.name,
  breed = excluded.breed,
  age = excluded.age,
  gender = excluded.gender,
  location = excluded.location,
  image = excluded.image,
  description = excluded.description,
  traits = excluded.traits,
  featured = excluded.featured,
  available = true;