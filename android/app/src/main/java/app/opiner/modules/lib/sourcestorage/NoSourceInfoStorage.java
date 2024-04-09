package app.opiner.modules.lib.sourcestorage;

import app.opiner.modules.lib.SourceInfo;

/**
 * {@link SourceInfoStorage} that does nothing.
 *
 * @author Alexey Danilov ('').
 */
public class NoSourceInfoStorage implements SourceInfoStorage {

    @Override
    public SourceInfo get(String url) {
        return null;
    }

    @Override
    public void put(String url, SourceInfo sourceInfo) {
    }

    @Override
    public void release() {
    }
}
