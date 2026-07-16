import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PostCard from "../components/PostCard";

function Profile() {
  const { username } = useParams(); 
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
const [editName, setEditName] = useState("");
const [editBio, setEditBio] = useState("");


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/profile/${username}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
          setPosts(data.posts);
          setFollowersCount(data.user.followers?.length || 0);

        
          if (userInfo && data.user.followers.includes(userInfo._id)) {
            setFollowing(true);
          }
        } else {
          navigate("/"); 
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, userInfo]);
const handleEditProfile = () => {
    setEditName(user.name);
    setEditBio(user.bio);
    setIsEditing(true);
};
const saveProfile = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch("http://localhost:5000/api/users/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
            body: JSON.stringify({ name: editName, bio: editBio }),
        });

        const data = await res.json();
        if (res.ok) {
            setUser(data); 
            setIsEditing(false); 
        }
    } catch (error) {
        console.error("Update failed", error);
    }
};

  const handleFollow = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/follow/${user._id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      if (res.ok) {
        setFollowing(!following);
        setFollowersCount(following ? followersCount - 1 : followersCount + 1);
      }
    } catch (error) {
      console.error("Follow failed", error);
    }
  };

  if (loading) return <div className="text-center mt-20 text-xl font-bold text-gray-500">Loading Profile...</div>;
  if (!user) return null;

  
  const isMyProfile = userInfo._id === user._id;

  return (
    <div className="max-w-2xl mx-auto my-4 px-4">
      
     
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          
          
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-bold border-4 border-blue-50">
            {user.name.charAt(0).toUpperCase()}
          </div>

        
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-500">@{user.username}</p>
            {user.bio && <p className="text-gray-700 mt-2">{user.bio}</p>}
          </div>

         
          <div>
            {isMyProfile ? (
              <button onClick={handleEditProfile} className="border border-gray-300 text-gray-700 px-5 py-1.5 rounded-lg font-medium hover:bg-gray-50 transition">
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleFollow}
                className={`px-6 py-1.5 rounded-lg font-medium transition ${
                  following
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {following ? "Following" : "Follow"}
              </button>
            )}
          </div>
        </div>

    
        <div className="flex justify-center sm:justify-start gap-8 mt-6 border-t pt-4">
          <div className="text-center">
            <span className="font-bold text-gray-800">{posts.length}</span>
            <span className="text-gray-500 ml-1">Posts</span>
          </div>
          <div className="text-center">
            <span className="font-bold text-gray-800">{followersCount}</span>
            <span className="text-gray-500 ml-1">Followers</span>
          </div>
          <div className="text-center">
            <span className="font-bold text-gray-800">{user.following?.length || 0}</span>
            <span className="text-gray-500 ml-1">Following</span>
          </div>
        </div>
      </div>

   
      <h2 className="text-lg font-bold text-gray-800 mb-4">{isMyProfile ? "Your Posts" : `${user.name}'s Posts`}</h2>
      
      {posts.length === 0 ? (
        <p className="text-center text-gray-500 bg-white p-8 rounded-xl border">No posts yet.</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            
            <form onSubmit={saveProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  rows="3"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Profile;